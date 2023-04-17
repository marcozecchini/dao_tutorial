const { CRYPTO_DAO_ADDRESS, WHITELIST_CONTRACT_ADDRESS, CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");


async function main() {
    const [addr1, addr2] = await ethers.getSigners();
    // addr1.sendTransaction({
    //   to: CRYPTO_DAO_ADDRESS,
    //   value: ethers.utils.parseEther("0.001")
    // });
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our CryptoDevsDAO contract.
  */
  const CryptoDevsDAOContract = await ethers.getContractFactory("CryptoDevsDAO");

  // 10 is the Maximum number of whitelisted addresses allowed
  const cryptoDevsDAO = await CryptoDevsDAOContract.attach(CRYPTO_DAO_ADDRESS);

  // print the address of the deployed contract
  console.log(
    "cryptoDevsDAO Contract Address:",
    cryptoDevsDAO.address
  );
   
  let proposalID = 1;
  let tx = await cryptoDevsDAO.connect(addr1).createProposal(proposalID);
  await tx.wait();
  console.log(`${proposalID} added as proposal`)

  tx = await cryptoDevsDAO.connect(addr2).voteOnProposal(proposalID, 0); // 0 is YAY
  await tx.wait();
  console.log(`${addr2.address} has voted`);
  
  tx = await cryptoDevsDAO.connect(addr1).voteOnProposal(proposalID, 0); // 0 is YAY
  await tx.wait();
  console.log(`${addr1.address} has voted`);

  setTimeout(async () => {  
    tx = await cryptoDevsDAO.connect(addr1).executeProposal(proposalID); 
    await tx.wait();
    console.log(`${proposalID} is executive`);
  }, 300000);

}

// Call the main function and catch if there is any error
main()
  .then(() => {})
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

 