const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyNFT", (m) => {
    const PAYMENT_TOKEN_ADDRESS = '0xD71AC555645f647585D5EB44FeeD928C9D363226'; // Address of the ERC20 token
    const MINT_PRICE = ethers.utils.parseUnits("100", 18); // Mint price in ERC20 tokens (e.g., 100 tokens with 18 decimals)

    // Deploy the MyNFT contract with the required parameters
    const nonFungible = m.contract("MyNFT", [PAYMENT_TOKEN_ADDRESS, MINT_PRICE]);

    return { nonFungible };
});