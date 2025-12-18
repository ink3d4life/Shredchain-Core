pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MiningGame is ERC721URIStorage, Ownable {
  IERC20 public shch;
  uint256 public tokenId;
  mapping(address => uint256) public hashPower;
  mapping(address => uint256) public lastMineTime;

  uint256 public constant UPGRADE_RATE = 10; // 1 $SHCH = 10 hash power
  uint256 public constant MINE_COOLDOWN = 1 hours;
  uint256 public constant BASE_REWARD = 10;

  string[] public trickTypes = ["Kickflip", "Ollie", "Heelflip", "540 Spin", "Frontside Grind", "Big Air", "Backflip"];

  constructor(address _shch) ERC721("Shredchain Rig Parts", "SRP") {
    shch = IERC20(_shch);
  }

  function generatePart() public {
    uint256 power = 20 + (tokenId % 50);
    string memory trick = trickTypes[tokenId % trickTypes.length];
    string memory uri = "ipfs://placeholder"; // Replace with real IPFS later

    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, uri);
    hashPower[msg.sender] += power;
    tokenId++;
  }

  function upgradeRig(uint256 amount) public {
    shch.transferFrom(msg.sender, address(this), amount * 1 ether);
    hashPower[msg.sender] += amount * UPGRADE_RATE;
  }

  function mine() public {
    require(block.timestamp - lastMineTime[msg.sender] >= MINE_COOLDOWN, "Cooldown active");
    require(hashPower[msg.sender] > 0, "No rig built");

    uint256 reward = BASE_REWARD + (hashPower[msg.sender] / 10);
    lastMineTime[msg.sender] = block.timestamp;
    shch.transfer(msg.sender, reward * 1 ether);
  }

  function withdrawTreasury() public onlyOwner {
    shch.transfer(owner(), shch.balanceOf(address(this)));
  }
}
