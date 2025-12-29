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

  // Prices are denominated in token units (wei, 1e18 = 1 SHCH)
  uint256 public partPrice; // price per part in SHCH (wei)
  uint256 public nftPrice; // price to buy special NFT in SHCH (wei)

  string[] public trickTypes = ["Kickflip", "Ollie", "Heelflip", "540 Spin", "Frontside Grind", "Big Air", "Backflip"];

  constructor(address _shch) ERC721("Shredchain Rig Parts", "SRP") Ownable(msg.sender) {
    shch = IERC20(_shch);
  }

  // owner-only price configuration
  function setPrices(uint256 _partPrice, uint256 _nftPrice) external onlyOwner {
    partPrice = _partPrice;
    nftPrice = _nftPrice;
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

  // Buy part(s) using SHCH token only
  function buyParts(uint256 count) external {
    require(count > 0, "Count must be > 0");
    require(partPrice > 0, "Part price not set");
    uint256 total = partPrice * count;
    // transfer SHCH from buyer to this contract
    require(shch.transferFrom(msg.sender, address(this), total), "Payment failed");

    for (uint256 i = 0; i < count; i++) {
      uint256 power = 20 + (tokenId % 50);
      string memory uri = "ipfs://placeholder";
      _safeMint(msg.sender, tokenId);
      _setTokenURI(tokenId, uri);
      hashPower[msg.sender] += power;
      tokenId++;
    }
  }

  // Buy a special NFT part with SHCH only
  function buySpecialNFT(string calldata tokenURI) external {
    require(nftPrice > 0, "NFT price not set");
    require(shch.transferFrom(msg.sender, address(this), nftPrice), "Payment failed");

    uint256 power = 100 + (tokenId % 100);
    uint256 mintedId = tokenId;
    _safeMint(msg.sender, mintedId);
    _setTokenURI(mintedId, tokenURI);
    hashPower[msg.sender] += power;
    tokenId++;
  }

  function upgradeRig(uint256 amount) public {
    // amount expressed in SHCH (not wei) — caller should pass token units in whole SHCH
    uint256 weiAmount = amount * 1 ether;
    require(shch.transferFrom(msg.sender, address(this), weiAmount), "Payment failed");
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
