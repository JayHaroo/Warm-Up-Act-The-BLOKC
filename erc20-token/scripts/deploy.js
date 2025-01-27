const { ethers } = require("hardhat");

async function main() {
  // Retrieve the contract factory
  const MyToken = await ethers.getContractFactory("MyToken");

  console.log("Deploying MyToken...");

  // Specify the initial owner's address (e.g., the first signer)
  const [deployer] = await ethers.getSigners();
  const initialOwner = deployer.address;

  // Deploy the contract with the required constructor argument
  const myToken = await MyToken.deploy(initialOwner);

  // Wait for the deployment to complete
  await myToken.getAddress();

  console.log(`MyToken deployed to: ${myToken.target}`);
  console.log(`Initial owner: ${initialOwner}`);
}

// Main execution
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
