const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying Staking contract with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // REPLACE THIS WITH YOUR REAL $SHCH TOKEN ADDRESS ON AMOY
  const tokenAddress = "0xYOUR_SHCH_TOKEN_ADDRESS_HERE";

  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(tokenAddress);

  await staking.waitForDeployment();

  console.log("Staking contract deployed to:", await staking.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
