require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    vanguard: {
      url: "https://rpc-vanguard.vanarchain.com",
      chainId: 78600,
      accounts: [ "dca09f11788e7954a8982f421ec3617f7fc9901a51af2dc6cc612a90c15c1b6f" ]
    },
    mainnet: {
      url: "https://rpc.vanarchain.com",
      chainId: 2040,
      accounts: [ "dca09f11788e7954a8982f421ec3617f7fc9901a51af2dc6cc612a90c15c1b6f" ]
    }
  }
};
