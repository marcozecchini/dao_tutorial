const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");


async function main() {
    const [addr1, addr2] = await ethers.getSigners();
    /*
    A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
    so whitelistContract here is a factory for instances of our Whitelist contract.
    */
    const cryptoDevs = await ethers.getContractFactory("CryptoDevs");

    const crypto = await cryptoDevs.attach(CRYPTODEVS_NFT_CONTRACT_ADDRESS);

    // print the address of the deployed contract
    console.log(
        "CryptoDev Contract Address:",
        crypto.address
    );

    let tx = await crypto.connect(addr1).startPresale();
    await tx.wait();
    console.log(`Presale Started`)

    tx = await crypto.connect(addr1).presaleMint({
        value: ethers.utils.parseEther("0.0001")
    });
    await tx.wait();
    console.log(`${addr1.address} has ${await crypto.balanceOf(addr1.address)} NFT(s)`)

    tx = await crypto.connect(addr2).presaleMint({
        value: ethers.utils.parseEther("0.0001")
    });
    await tx.wait();
    console.log(`${addr2.address} has ${await crypto.balanceOf(addr2.address)} NFT(s)`)
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

 