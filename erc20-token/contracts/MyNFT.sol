// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    // Base URI for metadata (change to your own base URI)
    string private _baseURIextended;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {
        _tokenIdCounter = 0; // Start the counter from 0
    }

    // Override the _baseURI function to return the custom base URI for token metadata
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    // Set the base URI for the metadata (e.g., IPFS or custom server)
    function setBaseURI(string memory baseURI_) public onlyOwner {
        _baseURIextended = baseURI_;
    }

    // Mint a new NFT to the given address
    function mint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _mint(to, tokenId);
        _tokenIdCounter++; // Increment the counter after minting
    }

    // Function to view the current token ID counter
    function currentTokenId() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
