const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT Contract", function () {
    let nft;
    let deployer;
    let recipient;

    beforeEach(async function () {
        // Get the signers
        [deployer, recipient] = await ethers.getSigners();

        // Get the contract factory for MyNFT
        const MyNFT = await ethers.getContractFactory("MyNFT");

        // Deploy the contract
        nft = await MyNFT.deploy("MyNFT", "MNFT");
    });

    it("should deploy the contract with the correct name and symbol", async function () {
        expect(await nft.name()).to.equal("MyNFT");
        expect(await nft.symbol()).to.equal("MNFT");
    });

    it("should mint a new NFT", async function () {
        // Mint a new NFT
        await nft.mint(recipient.address);

        // Check if the recipient received the NFT
        const balance = await nft.balanceOf(recipient.address);
        expect(balance).to.equal(1);

        // Check if the token ID exists
        const tokenOwner = await nft.ownerOf(0);
        expect(tokenOwner).to.equal(recipient.address);
    });

    it("should correctly update the token ID counter", async function () {
        const initialTokenId = await nft.currentTokenId();
        expect(initialTokenId).to.equal(0);

        // Mint a new NFT
        await nft.mint(recipient.address);

        const updatedTokenId = await nft.currentTokenId();
        expect(updatedTokenId).to.equal(1);
    });
});
