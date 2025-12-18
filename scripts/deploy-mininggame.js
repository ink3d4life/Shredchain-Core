const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying MiningGame with account:", deployer.address);

  const tokenAddress = "0xYOUR_SHCH_TOKEN_ADDRESS_HERE"; // Replace with your deployed $SHCH token on Amoy

  const MiningGame = await hre.ethers.getContractFactory("MiningGame");
  const game = await MiningGame.deploy(tokenAddress);

  await game.waitForDeployment();

  console.log("MiningGame deployed to:", await game.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
