// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _tokenIds; // Use uint256 explicitly
    IERC20 public immutable paymentToken; // Make paymentToken immutable
    uint256 public immutable mintPrice; // Make mintPrice immutable
    uint256 public immutable maxSupply; // Make maxSupply immutable

    constructor(
        string memory _name,
        string memory _symbol,
        address _paymentToken,
        uint256 _mintPrice,
        uint256 _maxSupply
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        require(_paymentToken != address(0), "Invalid payment token address");
        require(_maxSupply > 0, "Max supply must be greater than 0");

        paymentToken = IERC20(_paymentToken);
        mintPrice = _mintPrice;
        maxSupply = _maxSupply;
    }

    function mint() external {
        require(_tokenIds < maxSupply, "Supply Maxed Out");

        // Check the balance and allowance of the sender
        require(
            paymentToken.balanceOf(msg.sender) >= mintPrice,
            "Insufficient token balance"
        );
        require(
            paymentToken.allowance(msg.sender, address(this)) >= mintPrice,
            "Allowance not set or insufficient"
        );

        // Transfer tokens from the sender to the contract
        bool success = paymentToken.transferFrom(
            msg.sender,
            address(this),
            mintPrice
        );
        require(success, "Token transfer failed");

        _tokenIds++;
        _safeMint(msg.sender, _tokenIds); // Mint the new token
    }

    function withdraw() external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(balance > 0, "No balance to withdraw");

        bool success = paymentToken.transfer(owner(), balance);
        require(success, "Withdrawal failed");
    }

    // Optional: Add a function to get the current token ID
    function getCurrentTokenId() external view returns (uint256) {
        return _tokenIds;
    }
}