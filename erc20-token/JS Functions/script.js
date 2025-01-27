 // Set up Web3 instance
 const web3 = new Web3(window.ethereum);
 let accounts;

 // Define contract addresses and ABIs
 const nftContractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; // Replace with your NFT contract address
 const erc20ContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your ERC20 token address

 // Define contract ABI (simplified)
 const nftContractABI = [
     {
         "constant": false,
         "inputs": [
             {
                 "name": "to",
                 "type": "address"
             }
         ],
         "name": "mint",
         "outputs": [],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
     }
 ];

 const erc20ContractABI = [
     {
         "constant": true,
         "inputs": [
             {
                 "name": "account",
                 "type": "address"
             }
         ],
         "name": "balanceOf",
         "outputs": [
             {
                 "name": "",
                 "type": "uint256"
             }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
     },
     {
         "constant": false,
         "inputs": [
             {
                 "name": "spender",
                 "type": "address"
             },
             {
                 "name": "amount",
                 "type": "uint256"
             }
         ],
         "name": "approve",
         "outputs": [],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
     },
     {
         "constant": false,
         "inputs": [
             {
                 "name": "from",
                 "type": "address"
             },
             {
                 "name": "to",
                 "type": "address"
             },
             {
                 "name": "value",
                 "type": "uint256"
             }
         ],
         "name": "transferFrom",
         "outputs": [],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
     }
 ];

 // Initialize contracts
 const nftContract = new web3.eth.Contract(nftContractABI, nftContractAddress);
 const erc20Contract = new web3.eth.Contract(erc20ContractABI, erc20ContractAddress);

 // Request accounts from the user's wallet
 window.ethereum.request({ method: 'eth_requestAccounts' })
     .then((result) => {
         accounts = result;
         console.log('Connected account:', accounts[0]);
     })
     .catch((err) => console.error('Error connecting to wallet:', err));

 // Function to mint NFT by paying with ERC20
 async function mintNFT() {
     const account = accounts[0];
     const tokenAmount = document.getElementById('tokenAmount').value;
     const mintToAddress = document.getElementById('mintToAddress').value;

     if (!tokenAmount || !mintToAddress) {
         document.getElementById('status').innerText = 'Please enter valid values for amount and address.';
         document.getElementById('status').className = 'error';
         return;
     }

     const amountToPay = web3.utils.toWei(tokenAmount, 'ether'); // Convert token amount to proper units

     try {
         // Check if the user has enough ERC20 tokens
         const balance = await erc20Contract.methods.balanceOf(account).call();
         if (parseInt(balance) < parseInt(amountToPay)) {
             document.getElementById('status').innerText = 'Insufficient funds to mint NFT';
             document.getElementById('status').className = 'error';
             return;
         }

         // Approve ERC20 transfer
         await erc20Contract.methods.approve(nftContractAddress, amountToPay).send({ from: account });

         // Mint the NFT
         const mintTx = await nftContract.methods.mint(mintToAddress).send({ from: account });
         document.getElementById('status').innerText = `NFT minted successfully! Transaction Hash: ${mintTx.transactionHash}`;
         document.getElementById('status').className = 'success';
     } catch (error) {
         console.error('Error minting NFT:', error);
         document.getElementById('status').innerText = 'Error minting NFT';
         document.getElementById('status').className = 'error';
     }
 }

 // Attach mintNFT function to button
 document.getElementById('mintBtn').addEventListener('click', mintNFT);