// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Presale is Ownable {
    IERC20 public shch;
    IERC20 public token; // token sold in presale (SHCH or other)

    struct Phase {
        uint256 start;
        uint256 end;
        uint256 rate; // tokens per 1 MATIC (wei units)
        bool active;
        uint256 allocation; // max tokens (wei) allocated to this phase
        uint256 sold; // tokens (wei) sold in this phase
        uint256 minRate; // minimum rate at end of phase (wei)
    }

    Phase[] public phases;

    event PhaseAdded(uint256 indexed phaseId, uint256 start, uint256 end, uint256 rate, uint256 allocation, uint256 minRate);
    event TokensPurchased(address indexed buyer, uint256 paidShch, uint256 tokens);
    event Allocated(address indexed to, uint256 tokens);
    event TokensPurchasedWithMatic(address indexed buyer, uint256 paidWei, uint256 tokens);

    constructor(address _shch, address _token) Ownable(msg.sender) {
        shch = IERC20(_shch);
        token = IERC20(_token);
    }

    // buy with native MATIC (payable) — rate is tokens per 1 MATIC (wei units)
    function buyWithMatic() external payable {
        uint256 pid = currentPhase();
        Phase storage p = phases[pid];
        require(msg.value > 0, "zero value");
        uint256 rate = currentPhaseRate(pid);
        // tokens to give = msg.value (wei) * rate / 1e18
        uint256 tokens = (msg.value * rate) / 1e18;
        require(tokens > 0, "zero tokens");
        require(p.allocation == 0 || p.sold + tokens <= p.allocation, "exceeds allocation");
        require(token.transfer(msg.sender, tokens), "token transfer failed");
        p.sold += tokens;
        emit TokensPurchasedWithMatic(msg.sender, msg.value, tokens);
    }

    // owner can add phases
    // allocation and minRate are in token wei units; for fixed phases set minRate==rate
    function addPhase(uint256 start, uint256 end, uint256 rate, uint256 allocation, uint256 minRate) external onlyOwner {
        require(start < end, "start<end");
        phases.push(Phase({start:start, end:end, rate:rate, active:true, allocation:allocation, sold:0, minRate:minRate}));
        emit PhaseAdded(phases.length-1, start, end, rate, allocation, minRate);
    }

    function phaseCount() external view returns (uint256) {
        return phases.length;
    }

    // compute current rate for a phase; for last phase, interpolate between rate and minRate based on sold/allocation
    function currentPhaseRate(uint256 pid) public view returns (uint256) {
        Phase storage p = phases[pid];
        if (p.allocation == 0 || p.rate == p.minRate) return p.rate;
        // linear decrease from p.rate to p.minRate as sold increases from 0 to allocation
        if (p.sold >= p.allocation) return p.minRate;
        uint256 delta = p.rate > p.minRate ? p.rate - p.minRate : 0;
        uint256 dec = (delta * p.sold) / p.allocation;
        return p.rate - dec;
    }

    // get current phase id or revert
    function currentPhase() public view returns (uint256) {
        for (uint256 i = 0; i < phases.length; i++) {
            if (phases[i].active && block.timestamp >= phases[i].start && block.timestamp <= phases[i].end) {
                return i;
            }
        }
        revert("No active phase");
    }

    // buy with SHCH directly; buyer must approve this contract to spend SHCH
    function buyWithSHCH(uint256 shchAmount) external {
        uint256 pid = currentPhase();
        Phase storage p = phases[pid];
        uint256 rate = currentPhaseRate(pid);
        // tokens to give = shchAmount * rate (both in wei), adjust by 1e18
        uint256 tokens = (shchAmount * rate) / 1e18;
        require(tokens > 0, "zero tokens");
        require(p.allocation == 0 || p.sold + tokens <= p.allocation, "exceeds allocation");
        require(shch.transferFrom(msg.sender, address(this), shchAmount), "payment failed");
        require(token.transfer(msg.sender, tokens), "token transfer failed");
        p.sold += tokens;
        emit TokensPurchased(msg.sender, shchAmount, tokens);
    }

    // owner/operator can allocate tokens after off-chain fiat/card payment
    // This is intended to be called by the backend webhook (owner key)
    function allocateTokens(address to, uint256 tokens) external onlyOwner {
        require(token.transfer(to, tokens), "token transfer failed");
        emit Allocated(to, tokens);
    }

    // owner withdraw collected SHCH
    function withdrawShch(address to) external onlyOwner {
        uint256 bal = shch.balanceOf(address(this));
        shch.transfer(to, bal);
    }

    // emergency: withdraw any ERC20
    function withdrawToken(IERC20 erc, address to) external onlyOwner {
        uint256 b = erc.balanceOf(address(this));
        erc.transfer(to, b);
    }
}
