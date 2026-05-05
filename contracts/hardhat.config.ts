import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    localhost: {
      url: process.env.RPC_URL || "http://127.0.0.1:8545",
      chainId: 31337,
    },
    hardhat: {
      chainId: 31337,
    },
  },
};

export default config;
