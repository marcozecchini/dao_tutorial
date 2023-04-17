const { WHITELIST_CONTRACT_ADDRESS } = require("../constants");


async function main() {
    const [addr1, addr2] = await ethers.getSigners();
    
    /*
    A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
    so whitelistContract here is a factory for instances of our Whitelist contract.
    */
    const whitelistContract = await ethers.getContractFactory("Whitelist");

    // 10 is the Maximum number of whitelisted addresses allowed
    const whitelist = await whitelistContract.attach(WHITELIST_CONTRACT_ADDRESS);

    // print the address of the deployed contract
    console.log(
      "Whitelist Contract Address:",
      whitelist.address
    );

    let tx = await whitelist.connect(addr1).addAddressToWhitelist();
    await tx.wait();
    console.log(`${addr1.address} added to the whitelist`)

    tx = await whitelist.connect(addr2).addAddressToWhitelist();
    await tx.wait();
    console.log(`${addr2.address} added to the whitelist`)
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

 