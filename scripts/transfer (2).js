const hre = require('hardhat');

async function main() {
  const token = await hre.ethers.getContractAt('SHCHToken', '0x455a4D53808bF34f6EBfa626935405758f04E967');
  console.log('Transferring tokens...');
  const tx = await token.transfer('0x1f0e24ab40cfccc63f1c92b8a0e993c1d062b95f', hre.ethers.parseEther('1000000000'));
  await tx.wait();
  console.log('Complete! Hash:', tx.hash);
}

main().catch(console.error);