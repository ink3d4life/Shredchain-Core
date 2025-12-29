// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AthletePhotoNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    struct AthleteTag {
        string athleteName;
        string fanName;
        string eventName;
    }

    mapping(uint256 => AthleteTag) public athleteTags;

    constructor() ERC721("AthletePhotoNFT", "APN") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintWithPhoto(
        address recipient,
        string memory tokenURI,
        string memory athleteName,
        string memory fanName,
        string memory eventName
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        athleteTags[newTokenId] = AthleteTag({
            athleteName: athleteName,
            fanName: fanName,
            eventName: eventName
        });

        tokenCounter += 1;
        return newTokenId;
    }

    function getAthleteTag(uint256 tokenId) public view returns (AthleteTag memory) {
        return athleteTags[tokenId];
    }
}