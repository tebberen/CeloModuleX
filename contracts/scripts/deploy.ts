import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy NFT Access Contract first
  const NFTAccess = await ethers.getContractFactory("NFTAccess");
  const nft = await NFTAccess.deploy(
    ethers.utils.parseEther("5"), // Initial price: 5 CELO
    "https://celomodulex.com/api/nft/metadata/",
    deployer.address
  );
  await nft.deployed();
  console.log("NFTAccess deployed to:", nft.address);

  // Deploy MainHub
  const MainHub = await ethers.getContractFactory("MainHub");
  const mainHub = await MainHub.deploy(
    nft.address,
    ethers.utils.parseEther("0.1"), // basicFee: 0.1 CELO
    ethers.utils.parseEther("0.01"), // premiumFee: 0.01 CELO
    deployer.address
  );
  await mainHub.deployed();
  console.log("MainHub deployed to:", mainHub.address);

  // Deploy Modules
  const GM = await ethers.getContractFactory("GM");
  const gm = await GM.deploy();
  await gm.deployed();
  console.log("GM module deployed to:", gm.address);

  const Donate = await ethers.getContractFactory("Donate");
  const donate = await Donate.deploy(deployer.address); // Treasury address
  await donate.deployed();
  console.log("Donate module deployed to:", donate.address);

  const DeployModule = await ethers.getContractFactory("Deploy");
  const deployModule = await DeployModule.deploy();
  await deployModule.deployed();
  console.log("Deploy module deployed to:", deployModule.address);

  // Register modules in MainHub
  console.log("Registering modules...");
  
  await mainHub.registerModule(
    gm.address,
    0, // Social category
    0, // Free type
    false, // Not premium
    1 // Version 1
  );
  console.log("GM module registered");

  await mainHub.registerModule(
    donate.address,
    2, // Finance category
    1, // Paid type
    false, // Not premium
    1 // Version 1
  );
  console.log("Donate module registered");

  await mainHub.registerModule(
    deployModule.address,
    1, // Builder category
    0, // Free type
    true, // Premium - requires NFT
    1 // Version 1
  );
  console.log("Deploy module registered");

  console.log("\n=== DEPLOYMENT COMPLETE ===");
  console.log("NFTAccess:", nft.address);
  console.log("MainHub:", mainHub.address);
  console.log("GM Module:", gm.address);
  console.log("Donate Module:", donate.address);
  console.log("Deploy Module:", deployModule.address);
  console.log("============================\n");

  // Save deployment addresses to a file for frontend
  const addresses = {
    nft: nft.address,
    mainHub: mainHub.address,
    modules: {
      gm: gm.address,
      donate: donate.address,
      deploy: deployModule.address
    }
  };

  console.log("Addresses JSON for frontend:");
  console.log(JSON.stringify(addresses, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
