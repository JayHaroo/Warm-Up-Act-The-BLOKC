async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");
  // Deploy the contract, passing the name, symbol, and initial supply
  const token = await MyToken.deploy("MyToken", "MTK", 1000000);  // Name, Symbol, Initial Supply

  await token.deployed();

  console.log("Contract deployed to address:", token.address); // Use `.address` instead of `.target` for ethers.js v6+
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
