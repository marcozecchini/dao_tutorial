/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const INFURA_API_KEY_URL = process.env.INFURA_API_KEY_URL;

const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks : {
    sepolia: {
      url: INFURA_API_KEY_URL,
      accounts: {mnemonic: mnemonic},
    },
  },
  solidity: "0.8.18",

};