// Check if MetaMask is available
if (typeof window.ethereum === 'undefined') {
    alert("Please install MetaMask to use this dApp.");
} else {
    const web3 = new Web3(window.ethereum);
    const nftContractAddress = '0x71205ac481f36b568e4f9b53e9152e075f658dfb'; // Replace with your deployed MyNFT contract address
    const erc20TokenAddress = '0xD71AC555645f647585D5EB44FeeD928C9D363226'; // Replace with your deployed ERC20 token address

    let nftABI = null;
    let erc20ABI = null;
    let accounts = [];

    // Load ABIs dynamically
    async function loadABIs() {
        try {
            // Load MyNFT ABI
            nftABI = await fetch('./tokens/artifacts/contracts/MyNFT.sol/MyNFT.json')
                .then(response => response.json())
                .then(data => data.abi);

            // Load ERC20 ABI
            erc20ABI = await fetch('./tokens/artifacts/contracts/MyToken.sol/MyToken.json')
                .then(response => response.json())
                .then(data => data.abi);

            console.log("ABIs loaded successfully");
        } catch (error) {
            console.error("Failed to load ABIs:", error);
            document.getElementById('status').textContent = "Failed to load contract ABIs.";
            document.getElementById('status').classList.add("error");
        }
    }

    // Request account access
    async function loadWeb3() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = await web3.eth.getAccounts();
            console.log("Connected Account:", accounts[0]);
        } catch (error) {
            console.error("MetaMask connection error:", error);
            document.getElementById('status').textContent = "MetaMask connection failed.";
            document.getElementById('status').classList.add("error");
        }
    }

    // Approve ERC20 tokens for the NFT contract
    async function approveERC20() {
        if (!accounts || accounts.length === 0) {
            alert("Please connect your MetaMask wallet.");
            return;
        }

        if (!erc20ABI) {
            alert("ERC20 ABI not loaded. Please try again.");
            return;
        }

        const erc20Contract = new web3.eth.Contract(erc20ABI, erc20TokenAddress);
        const mintPrice = await getMintPrice(); // Fetch the mint price from the NFT contract

        try {
            document.getElementById('status').textContent = "Approving ERC20 tokens...";
            document.getElementById('status').classList.remove("success", "error");

            const approveTx = await erc20Contract.methods
                .approve(nftContractAddress, mintPrice)
                .send({ from: accounts[0] });

            document.getElementById('status').textContent = "ERC20 tokens approved!";
            document.getElementById('status').classList.add("success");
            console.log('Approval transaction:', approveTx);
        } catch (error) {
            document.getElementById('status').textContent = "ERC20 approval failed!";
            document.getElementById('status').classList.add("error");
            console.error("Approval error:", error);
        }
    }

    // Fetch the mint price from the NFT contract
    async function getMintPrice() {
        const nftContract = new web3.eth.Contract(nftABI, nftContractAddress);
        return await nftContract.methods.mintPrice().call();
    }

    // Check if the user has approved enough ERC20 tokens for minting
    async function checkApproval() {
        if (!accounts || accounts.length === 0) {
            alert("Please connect your MetaMask wallet.");
            return false;
        }

        if (!erc20ABI || !nftABI) {
            alert("Contract ABIs not loaded. Please try again.");
            return false;
        }

        const erc20Contract = new web3.eth.Contract(erc20ABI, erc20TokenAddress);
        const mintPrice = await getMintPrice();

        // Check the allowance for the NFT contract
        const allowance = await erc20Contract.methods
            .allowance(accounts[0], nftContractAddress)
            .call();

        return allowance >= mintPrice;
    }

    // Mint NFT function
    async function mintNFT() {
        if (!accounts || accounts.length === 0) {
            alert("Please connect your MetaMask wallet.");
            return;
        }

        if (!nftABI) {
            alert("NFT ABI not loaded. Please try again.");
            return;
        }

        // Check if the user has approved enough tokens
        const isApproved = await checkApproval();
        if (!isApproved) {
            alert("Please approve ERC20 tokens before minting.");
            return;
        }

        const nftContract = new web3.eth.Contract(nftABI, nftContractAddress);

        try {
            document.getElementById('status').textContent = "Minting in progress...";
            document.getElementById('status').classList.remove("success", "error");

            const mintTx = await nftContract.methods.mint().send({ from: accounts[0] });

            document.getElementById('status').textContent = "Minting successful!";
            document.getElementById('status').classList.add("success");
            console.log('Minting transaction:', mintTx);
        } catch (error) {
            document.getElementById('status').textContent = "Minting failed!";
            document.getElementById('status').classList.add("error");
            console.error("Minting error:", error);
        }
    }

    // Event listener for approve button
    document.getElementById('approveBtn').addEventListener('click', async () => {
        await loadWeb3();
        await loadABIs();
        await approveERC20();
    });

    // Event listener for mint button
    document.getElementById('mintBtn').addEventListener('click', async () => {
        await loadWeb3();
        await loadABIs();
        await mintNFT();
    });
}