require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition"); // Add Ignition plugin
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`, // Infura Sepolia endpoint
      accounts: [process.env.PRIVATE_KEY], // Use environment variable for the private key
    },
  },
};