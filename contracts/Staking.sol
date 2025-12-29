pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
  IERC20 public shch;
  uint256 public rewardRate = 50; // Mock 5% APY — adjustable
  uint256 public lastUpdateTime;
  uint256 public rewardPerTokenStored;

  mapping(address => uint256) public stakedBalance;
  mapping(address => uint256) public userRewardPerTokenPaid;
  mapping(address => uint256) public rewards;

  constructor(address _shch) Ownable(msg.sender) {
    shch = IERC20(_shch);
    lastUpdateTime = block.timestamp;
  }


  function stake(uint256 amount) external {
    updateReward(msg.sender);
    shch.transferFrom(msg.sender, address(this), amount);
    stakedBalance[msg.sender] += amount;
  }

  function withdraw(uint256 amount) external {
    updateReward(msg.sender);
    stakedBalance[msg.sender] -= amount;
    shch.transfer(msg.sender, amount);
  }

  function claimReward() external {
    updateReward(msg.sender);
    uint256 reward = rewards[msg.sender];
    rewards[msg.sender] = 0;
    shch.transfer(msg.sender, reward);
  }

  function updateReward(address account) internal {
    rewardPerTokenStored = rewardPerToken();
    lastUpdateTime = block.timestamp;
    if (account != address(0)) {
      rewards[account] = earned(account);
      userRewardPerTokenPaid[account] = rewardPerTokenStored;
    }
  }

  function rewardPerToken() public view returns (uint256) {
    if (totalStaked() == 0) return rewardPerTokenStored;
    return rewardPerTokenStored + ((block.timestamp - lastUpdateTime) * rewardRate * 1e18 / totalStaked());
  }

  function earned(address account) public view returns (uint256) {
    return (stakedBalance[account] * (rewardPerToken() - userRewardPerTokenPaid[account]) / 1e18) + rewards[account];
  }

  function totalStaked() public view returns (uint256) {
    return shch.balanceOf(address(this));
  }
}

