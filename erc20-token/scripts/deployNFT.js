async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory for MyNFT
    const MyNFT = await ethers.getContractFactory("MyNFT");

    // Deploy the contract with the constructor parameters
    const nft = await MyNFT.deploy("MyNFT", "MNFT");

    // Wait for the deployment to be mined
    await nft.deployed();

    console.log("NFT Contract deployed to:", nft.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
