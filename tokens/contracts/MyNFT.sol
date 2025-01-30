// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable(msg.sender) {
    IERC20 public erc20Token;
    uint256 public mintPrice;
    uint256 public tokenCounter;

    constructor(address _erc20Token, uint256 _mintPrice) ERC721("MyNFT", "MNFT") {
        erc20Token = IERC20(_erc20Token);
        mintPrice = _mintPrice;
        tokenCounter = 0;
    }

    function mint() external {
        require(erc20Token.allowance(msg.sender, address(this)) >= mintPrice, "Allowance not set");
        
        // Transfer ERC20 tokens from the user to this contract
        require(erc20Token.transferFrom(msg.sender, address(this), mintPrice), "Transfer failed");

        // Mint the NFT
        _safeMint(msg.sender, tokenCounter);
        tokenCounter++;
    }

    function setMintPrice(uint256 _mintPrice) external onlyOwner {
        mintPrice = _mintPrice;
    }

    function withdrawERC20() external onlyOwner {
        uint256 balance = erc20Token.balanceOf(address(this));
        require(erc20Token.transfer(msg.sender, balance), "Transfer failed");
    }
}