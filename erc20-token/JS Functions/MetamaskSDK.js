const getWeb3 = async () => {
    return new Promise((resolve, reject) => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);

            try {
                // Request account access if needed
                window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(() => resolve(web3))
                    .catch((error) => reject(error));
            } catch (error) {
                reject(error);
            }
        } else {
            reject(new Error('Ethereum provider not found. Install MetaMask or use a compatible browser.'));
        }
    });
};

document.getElementById('connBtn').addEventListener('click', async (event) => {
    try {
        const web3 = await getWeb3();
        const walletAddresses = await web3.eth.requestAccounts();

        // Display the connected wallet address
        document.getElementById('mintToAddress').innerText = walletAddresses[0];

        // Remove the hidden attribute from the mint button
        const mintBtn = document.getElementById('mintBtn');
        if (mintBtn.hasAttribute('hidden')) {
            mintBtn.removeAttribute('hidden');
        }
    } catch (error) {
        console.error('Error connecting to wallet:', error);
    }
});
