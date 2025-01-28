const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyNFT", (m) => {
    const PAYMENT_TOKEN_ADDRESS = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
    const NAME = 'MyNFT';
    const SYMBOL = 'MNFT';
    const MINT_PRICE = '100';
    const MAX_SUPPLY = 10000;
  
    const nonFungible = m.contract('MyNFT', [ PAYMENT_TOKEN_ADDRESS, NAME, SYMBOL, MINT_PRICE, MAX_SUPPLY]);
  
    return { nonFungible };
});