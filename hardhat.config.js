require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// 从环境变量或直接设置配置
const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337
    },
    hardhat: {
      chainId: 1337
    },
    // Sepolia测试网配置 (Arbitrum DevNet) - 主RPC
    sepolia: {
      url: "https://arbitrum-sepolia-rpc.publicnode.com",
      accounts: [PRIVATE_KEY],
      chainId: 421614,
      gasPrice: "auto",
      gas: "auto",
      timeout: 60000
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
