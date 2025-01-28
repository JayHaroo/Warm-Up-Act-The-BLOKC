const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyToken", (m) => {
    const NAME = 'MyToken';
    const SYMBOL = 'MTK';
    const INITIAL_SUPPLY = 1000000;
  
    const token = m.contract('MyToken', [NAME, SYMBOL, INITIAL_SUPPLY]);

  return { token };
});