const hre = require("hardhat");

async function main() {
  console.log("Deploying SHCH Token...");

  const initialSupply = 1000000000; // 1 billion tokens

  const SHCHToken = await hre.ethers.getContractFactory("SHCHToken");
  const token = await SHCHToken.deploy(initialSupply);

  await token.deployed(); // v2 syntax
  console.log("SHCH Token deployed to:", token.address);
  console.log("Initial supply:", initialSupply, "SHCH");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});