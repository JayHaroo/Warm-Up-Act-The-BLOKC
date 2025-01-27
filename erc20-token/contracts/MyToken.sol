// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, ERC20Burnable, Ownable {
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        Ownable(msg.sender) // Call Ownable constructor without parameters as it's done in the contract
    {
        transferOwnership(initialOwner); // Set the initial owner
        _mint(initialOwner, 10 * 10 ** decimals()); // Mint initial supply to initialOwner
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
