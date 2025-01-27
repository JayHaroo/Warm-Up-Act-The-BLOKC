// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MyToken - An example ERC20 token contract
/// @notice This contract is an example of a simple ERC20 token with mint and burn capabilities
contract MyToken is ERC20, Ownable {
    /// @notice Constructor to initialize the token with name, symbol, and initial supply
    /// @param name The name of the token
    /// @param symbol The symbol of the token
    /// @param initialSupply The initial supply of tokens
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) 
        ERC20(name, symbol)
    {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "ERC20: mint to the zero address");
        _mint(to, amount);
    }

    /// @notice Function to burn tokens
    /// @param amount The amount of tokens to burn
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}