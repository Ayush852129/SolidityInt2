require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  networks: {
    local: {
      url: "http://localhost:8545", // Replace with the URL of your local node
      chainId: 31337, // Replace with your desired Chain ID
    },
  },
  solidity: {
    version: "0.8.9", // Specify the desired Solidity compiler version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
