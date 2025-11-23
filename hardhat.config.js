require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [process.env.PRIVATE_KEY], // we'll add this in .env in a second
      chainId: 80002,
      gasPrice: 30000000000
    },
    polygon: {
      url: "https://polygon-rpc.com/",
      accounts: 2e2412c4cedc367fafcd6e24172607cc3a0a443a5e1127bf83c0ea15063b9a01],
      chainId: 137
    }
  },
  etherscan: {
    apiKey: {
      amoy: "XDHBRV36137RW9743J5U2BHXPUH4N57AKQ",
      polygon: "XDHBRV36137RW9743J5U2BHXPUH4N57AKQ"
    },
    customChains: [
      {
        network: "amoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com"
        }
      }
    ]
  }
};