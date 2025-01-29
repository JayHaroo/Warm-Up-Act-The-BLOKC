const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyNFT", (m) => {
    const PAYMENT_TOKEN_ADDRESS = '0xD71AC555645f647585D5EB44FeeD928C9D363226'; // Use the previous address
    const NAME = 'MyNFT'; // Use the previous name
    const SYMBOL = 'MNFT'; // Use the previous symbol
    const MINT_PRICE = 0; // Use the previous mint price
    const MAX_SUPPLY = 1000; // Use the previous max supply

    const nonFungible = m.contract('MyNFT', [NAME, SYMBOL, PAYMENT_TOKEN_ADDRESS, MINT_PRICE, MAX_SUPPLY]);

    return { nonFungible };
});