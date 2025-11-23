const hre = require('hardhat');

async function main() {
  console.log('Deploying SHCH Token...');
  
  const initialSupply = 1000000000; // 1 billion tokens
  
  const SHCHToken = await hre.ethers.getContractFactory('SHCHToken');
  const token = await SHCHToken.deploy(initialSupply);
  
  await token.waitForDeployment();
  const address = await token.getAddress();
  
  console.log('SHCH Token deployed to:', address);
  console.log('Initial supply:', initialSupply, 'SHCH');
  console.log('View on PolygonScan: https://amoy.polygonscan.com/address/' + address);
  
  console.log('Waiting for block confirmations...');
  await token.deploymentTransaction().wait(5);
  
  console.log('Verifying contract on PolygonScan...');
  try {
    await hre.run('verify:verify', {
      address: address,
      constructorArguments: [initialSupply],
    });
    console.log('Contract verified successfully!');
  } catch (error) {
    console.log('Verification failed, but contract is deployed');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});