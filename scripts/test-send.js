const hre = require('hardhat');

async function main() {
  const tokenAddress = '0x455a4D53808bF34f6EBfa626935405758f04E967';
  const recipientAddress = '0x4ac72122f4dd24285ac6230fab7dba5273d284a3';
  const amount = '100000'; // 100,000 SHCH tokens
  
  console.log('Getting SHCH token contract...');
  const token = await hre.ethers.getContractAt('SHCHToken', tokenAddress);
  
  console.log('Checking balances before transfer...');
  const senderBalance = await token.balanceOf('0x1f0E24aB40cFCCc63f1c92B8a0E993c1D062B95f');
  const recipientBalance = await token.balanceOf(recipientAddress);
  
  console.log('Sender balance:', hre.ethers.formatEther(senderBalance), 'SHCH');
  console.log('Recipient balance:', hre.ethers.formatEther(recipientBalance), 'SHCH');
  
  console.log('\nTransferring', amount, 'SHCH tokens...');
  const tx = await token.transfer(recipientAddress, hre.ethers.parseEther(amount));
  console.log('Transaction submitted. Waiting for confirmation...');
  
  await tx.wait();
  
  console.log('\nTransfer complete!');
  console.log('Transaction hash:', tx.hash);
  console.log('View on PolygonScan:', 'https://amoy.polygonscan.com/tx/' + tx.hash);
  
  console.log('\nChecking balances after transfer...');
  const newSenderBalance = await token.balanceOf('0x1f0E24aB40cFCCc63f1c92B8a0E993c1D062B95f');
  const newRecipientBalance = await token.balanceOf(recipientAddress);
  
  console.log('Sender new balance:', hre.ethers.formatEther(newSenderBalance), 'SHCH');
  console.log('Recipient new balance:', hre.ethers.formatEther(newRecipientBalance), 'SHCH');
}

main().catch(console.error);