import { run } from "hardhat";

async function main() {
  // Contract addresses from deployment
  const nftAddress = "NFT_ADDRESS_HERE";
  const mainHubAddress = "MAINHUB_ADDRESS_HERE";
  const gmAddress = "GM_MODULE_ADDRESS_HERE";
  const donateAddress = "DONATE_MODULE_ADDRESS_HERE";
  const deployAddress = "DEPLOY_MODULE_ADDRESS_HERE";

  console.log("Verifying contracts on CeloScan...");

  // Verify NFTAccess
  console.log("Verifying NFTAccess...");
  await run("verify:verify", {
    address: nftAddress,
    constructorArguments: [
      ethers.utils.parseEther("5"),
      "https://celomodulex.com/api/nft/metadata/",
      "DEPLOYER_ADDRESS_HERE"
    ],
  });

  // Verify MainHub
  console.log("Verifying MainHub...");
  await run("verify:verify", {
    address: mainHubAddress,
    constructorArguments: [
      nftAddress,
      ethers.utils.parseEther("0.1"),
      ethers.utils.parseEther("0.01"),
      "DEPLOYER_ADDRESS_HERE"
    ],
  });

  // Verify Modules
  console.log("Verifying GM module...");
  await run("verify:verify", {
    address: gmAddress,
    constructorArguments: [],
  });

  console.log("Verifying Donate module...");
  await run("verify:verify", {
    address: donateAddress,
    constructorArguments: ["TREASURY_ADDRESS_HERE"],
  });

  console.log("Verifying Deploy module...");
  await run("verify:verify", {
    address: deployAddress,
    constructorArguments: [],
  });

  console.log("All contracts verified successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
