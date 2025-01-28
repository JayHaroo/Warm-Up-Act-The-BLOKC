const hre = require("hardhat");

async function main() {
  // Get the contract artifacts (ABI)
  const myToken = await hre.ethers.getContractFactory("MyToken");
  const myNft = await hre.ethers.getContractFactory("MyNFT");

  // Get the ABI
  const myTokenABI = myToken.interface.format('json');
  const myNftABI = myNft.interface.format('json');

  // Output the ABIs
  console.log("MyToken ABI:", myTokenABI);
  console.log("MyNFT ABI:", myNftABI);
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
