const hre = require("hardhat");

async function main() {
  console.log("Deploying AthletePhotoScan...");

  // Example: if AthletePhotoScan takes a baseURI or owner address, add them here
  const baseURI = "ipfs://your-flattened-metadata-link/";

  const AthletePhotoScan = await hre.ethers.getContractFactory("AthletePhotoScan");
  const contract = await AthletePhotoScan.deploy(baseURI);

  await contract.deployed();
  console.log("AthletePhotoScan deployed to:", contract.address);

  console.log("Verifying contract on PolygonScan...");
  try {
    await hre.run("verify:verify", {
      address: contract.address,
      constructorArguments: [baseURI],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.log("Verification failed, but contract is deployed");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});