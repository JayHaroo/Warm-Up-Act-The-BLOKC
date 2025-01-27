const { ethers } = require("hardhat");

async function main() {
  // Retrieve the contract factory
  const MyNFT = await ethers.getContractFactory("MyNFT");

  console.log("Deploying MyNFT...");

  // Specify the initial owner's address (e.g., the first signer)
  const [deployer] = await ethers.getSigners();
  const initialOwner = deployer.address;

  // Deploy the contract with the required constructor argument
  const myNFT = await MyNFT.deploy(initialOwner);

  // Wait for the deployment to complete
  await myNFT.getAddress();

  console.log(`MyNFT deployed to: ${myNFT.target}`);
  console.log(`Initial owner: ${initialOwner}`);
}

// Main execution
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });