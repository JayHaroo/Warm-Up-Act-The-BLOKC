async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contract with the account:", deployer.address);
  
    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy("MyToken", "MTK", 1000000); // Name, Symbol, Initial Supply
  
    console.log("Contract deployed to address:", token.target); // Use `.target` instead of `.address` for ethers.js v6+
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  