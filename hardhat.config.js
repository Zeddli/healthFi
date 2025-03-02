require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    vanguard: {
      url: "https://rpc-vanguard.vanarchain.com",
      chainId: 78600,
      accounts: [ process.env.PRIVATE_KEY ]
    },
    mainnet: {
      url: "https://rpc.vanarchain.com",
      chainId: 2040,
      accounts: [ process.env.PRIVATE_KEY ]
    }
  },
  etherscan: {
    // Use your Vanar Chain API key if provided by the explorer
    apiKey: {
      vanguard: "", //process.env.VANAR_API_KEY ||
      mainnet: "", //process.env.VANAR_API_KEY ||
    },
  },
};
