import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import fs from "fs";
import path from "path";

function loadEnvFile(envPath: string) {
  try {
    const contents = fs.readFileSync(envPath, "utf8");
    contents
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"))
      .forEach(line => {
        const [key, ...rest] = line.split("=");
        if (!key) return;
        const value = rest.join("=").trim().replace(/^['"]|['"]$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      });
  } catch (error) {
    // If the .env file is missing, silently continue with existing environment variables.
  }
}

const envPaths = [path.join(__dirname, ".env"), path.join(__dirname, "..", ".env")];
envPaths.forEach(loadEnvFile);

const config: HardhatUserConfig = {
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
    celo: {
      url: "https://forno.celo.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: {
      celo: process.env.CELOSCAN_API_KEY || "",
      alfajores: process.env.CELOSCAN_API_KEY || ""
    }
  }
};

export default config;
