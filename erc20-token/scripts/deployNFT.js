// deploy.js
const hre = require("hardhat");
const ethers = hre.ethers; // Explicit import

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Compile and deploy the MyNFT contract
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");

  const name = "MyNFT";
  const symbol = "MNFT";
  const paymentTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const mintPrice = ethers.utils.parseUnits("100", 18); // Mint price is 100 tokens
  const maxSupply = 1000; 

  const myNFT = await MyNFT.deploy(name, symbol, paymentTokenAddress, mintPrice, maxSupply);

  await myNFT.deployed();

  console.log("MyNFT deployed to:", myNFT.target); 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
