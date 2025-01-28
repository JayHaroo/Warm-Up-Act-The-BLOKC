// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
  uint private _tokenIds;
  IERC20 public paymentToken;
  uint public mintPrice;
  uint public maxSupply;

  constructor(string memory _name, string memory _symbol, address _paymentToken, uint _mintPrice, uint _maxSupply) ERC721(_name, _symbol) Ownable(msg.sender) {
    paymentToken = IERC20(_paymentToken);
    mintPrice = _mintPrice;
    maxSupply = _maxSupply;
  }

  function mint() external {
    require(_tokenIds < maxSupply, "Supply Maxed Out");
    
    // Check the balance of the sender
    require(paymentToken.balanceOf(msg.sender) >= mintPrice, "Insufficient token balance");
    
    // Check the allowance set by the sender
    require(paymentToken.allowance(msg.sender, address(this)) >= mintPrice, "Allowance not set or insufficient");
    
    // Transfer tokens from the sender to the contract
    bool success = paymentToken.transferFrom(msg.sender, address(this), mintPrice);
    require(success, "Token transfer failed");

    _tokenIds++;
    uint newTokenId = _tokenIds;
    _safeMint(msg.sender, newTokenId);
  }

  function withdraw() external onlyOwner {
    uint balance = paymentToken.balanceOf(address(this));
    paymentToken.transfer(owner(), balance);
  }
}