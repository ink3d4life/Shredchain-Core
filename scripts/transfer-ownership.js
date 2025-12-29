const hre = require('hardhat');

async function main() {
  const safe = process.env.SAFE_ADDRESS;
  if (!safe) throw new Error('Please set SAFE_ADDRESS in your .env');

  // Default to known SHCH token address if not provided
  const tokenAddress = process.env.TOKEN_ADDRESS || '0x455a4D53808bF34f6EBfa626935405758f04E967';
  const stakingAddress = process.env.STAKING_ADDRESS || '';
  const miningAddress = process.env.MININGGAME_ADDRESS || '';
  const nftAddress = process.env.ATHLETE_NFT_ADDRESS || '';

  const list = [
    { name: 'SHCHToken', addr: tokenAddress },
    { name: 'Staking', addr: stakingAddress },
    { name: 'MiningGame', addr: miningAddress },
    { name: 'AthletePhotoNFT', addr: nftAddress }
  ].filter(c => c.addr && c.addr !== '');

  for (const c of list) {
    console.log(`Processing ${c.name} at ${c.addr}`);
    const contract = await hre.ethers.getContractAt(c.name, c.addr);
    try {
      const tx = await contract.transferOwnership(safe);
      await tx.wait();
      console.log(`-> ownership transferred for ${c.name} (tx: ${tx.hash})`);
    } catch (err) {
      console.error(`-> failed to transfer ownership for ${c.name}:`, err.message || err);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
