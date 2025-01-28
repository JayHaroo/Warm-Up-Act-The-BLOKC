// Check if MetaMask is available
if (typeof window.ethereum === 'undefined') {
    alert("Please install MetaMask to use this dApp.");
} else {
    const web3 = new Web3(window.ethereum);
    const nftContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

    let nftABI = null;
    let accounts = [];

    // Load ABIs dynamically
    async function loadABIs() {
        nftABI = await fetch('./tokens/artifacts/contracts/MyNFT.sol/MyNFT.json')
            .then(response => response.json())
            .then(data => data.abi)
            .catch(error => {
                console.error("Failed to load ABI:", error);
                document.getElementById('status').textContent = "Failed to load contract ABI.";
                document.getElementById('status').classList.add("error");
            });
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

    // Mint NFT function
    async function mintNFT() {
        if (!accounts || accounts.length === 0) {
            alert("Please connect your MetaMask wallet.");
            return;
        }

        if (!nftABI) {
            alert("Contract ABI not loaded. Please try again.");
            return;
        }

        const contract = new web3.eth.Contract(nftABI, nftContractAddress);
        try {
            document.getElementById('status').textContent = "Minting in progress...";
            document.getElementById('status').classList.remove("success", "error");

            const mintTx = await contract.methods.mint(accounts[0]).send({ from: accounts[0] });

            document.getElementById('status').textContent = "Minting successful!";
            document.getElementById('status').classList.add("success");
            console.log('Minting transaction:', mintTx);
        } catch (error) {
            document.getElementById('status').textContent = "Minting failed!";
            document.getElementById('status').classList.add("error");
            console.error("Minting error:", error);
        }
    }

    // Event listener for mint button
    document.getElementById('mintBtn').addEventListener('click', async () => {
        await loadWeb3();
        await loadABIs();
        await mintNFT();
    });
}