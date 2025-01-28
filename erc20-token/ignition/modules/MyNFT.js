const MyNFT = buildModule('MyNFTModule', (m) => {
    const PAYMENT_TOKEN_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const NAME = 'MyNFT';
    const SYMBOL = 'MFT';
    const MINT_PRICE = '100';
    const MAX_SUPPLY = 10000;
  
    const nonFungible = m.contract('MintXNonFungible', [
      NAME,
      SYMBOL,
      PAYMENT_TOKEN_ADDRESS,
      MINT_PRICE,
      MAX_SUPPLY,
    ]);
  
    return { nonFungible };
  });
  
  export default MintXNonFungibleModule; 
