const hre = require("hardhat");

async function main() {
  console.log("Deploying SHCH Token, Presale and MiningGame (example)...");

  const initialSupply = process.env.INITIAL_SUPPLY ? parseInt(process.env.INITIAL_SUPPLY) : 1000000; // default 1,000,000

  const SHCHToken = await hre.ethers.getContractFactory("SHCHToken");
  const shch = await SHCHToken.deploy(initialSupply);
  await shch.waitForDeployment?.();
  console.log("SHCH Token deployed to:", shch.target || shch.address || shch);

  // Deploy Presale (using SHCH as both payment token and sale token here)
  const Presale = await hre.ethers.getContractFactory("Presale");
  const presale = await Presale.deploy(shch.target || shch.address || shch, shch.target || shch.address || shch);
  await presale.waitForDeployment?.();
  console.log("Presale deployed to:", presale.target || presale.address || presale);

  // Deploy MiningGame pointing at SHCH token
  const MiningGame = await hre.ethers.getContractFactory("MiningGame");
  const mining = await MiningGame.deploy(shch.target || shch.address || shch);
  await mining.waitForDeployment?.();
  console.log("MiningGame deployed to:", mining.target || mining.address || mining);

  console.log("Deployment complete. Update .env with these addresses for scripts.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});