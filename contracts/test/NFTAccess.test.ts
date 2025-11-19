import { ethers, run } from "hardhat";

type DeploymentConfig = {
  nftAddress: string;
  mainHubAddress: string;
  gmAddress: string;
  donateAddress: string;
  deployAddress: string;
  deployer: string;
};

const deploymentConfig: DeploymentConfig = {
  nftAddress: "NFT_ADDRESS_HERE",
  mainHubAddress: "MAINHUB_ADDRESS_HERE",
  gmAddress: "GM_MODULE_ADDRESS_HERE",
  donateAddress: "DONATE_MODULE_ADDRESS_HERE",
  deployAddress: "DEPLOY_MODULE_ADDRESS_HERE",
  deployer: "DEPLOYER_ADDRESS_HERE",
};

function hasPlaceholders(config: DeploymentConfig) {
  return Object.values(config).some(value => value.includes("_HERE"));
}

async function verifyDeployment(config: DeploymentConfig) {
  await run("verify:verify", {
    address: config.nftAddress,
    constructorArguments: [
      ethers.utils.parseEther("5"),
      "https://celomodulex.com/api/nft/metadata/",
      config.deployer,
    ],
  });

  await run("verify:verify", {
    address: config.mainHubAddress,
    constructorArguments: [
      config.nftAddress,
      ethers.utils.parseEther("0.1"),
      ethers.utils.parseEther("0.01"),
      config.deployer,
    ],
  });

  await run("verify:verify", {
    address: config.gmAddress,
    constructorArguments: [],
  });

  await run("verify:verify", {
    address: config.donateAddress,
    constructorArguments: ["TREASURY_ADDRESS_HERE"],
  });

  await run("verify:verify", {
    address: config.deployAddress,
    constructorArguments: [],
  });
}

describe("Contract verification helper", function () {
  it("submits verification requests when deployment addresses are provided", async function () {
    if (hasPlaceholders(deploymentConfig)) {
      this.skip();
    }

    await verifyDeployment(deploymentConfig);
  });
});
