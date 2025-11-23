require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygonAmoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [2e2412c4cedc367fafcd6e24172607cc3a0a443a5e1127bf83c0ea15063b9a01],
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: "XDHBRV36137RW9743J5U2BHXPUH4N57AKQ"
    }
  }
};