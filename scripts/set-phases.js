const hre = require('hardhat');
const { ethers } = require('hardhat');

// Usage: npx hardhat run scripts/set-phases.js --network amoy
async function main() {
  const presaleAddress = process.env.PRESALE_ADDRESS;
  if (!presaleAddress) throw new Error('Set PRESALE_ADDRESS in .env');

  const presale = await ethers.getContractAt('Presale', presaleAddress);

  // Phase lengths: 1.5 weeks = 10.5 days = 907200 seconds
  const PHASE_LEN = 907200;

  // start now + 1 minute buffer
  const now = Math.floor(Date.now() / 1000) + 60;

  // Configure rates and allocations
  // We'll use: Phase1 = 24 SHCH/MATIC (fixed), Phase2 = 12 SHCH/MATIC (fixed)
  // Phase3 starts at 12 SHCH/MATIC and dynamically moves toward minRate=3 SHCH/MATIC as tokens sell.
  const rates = [24, 12, 12].map(r => ethers.parseUnits(r.toString(), 18));
  // Set minRate for last phase to 0 to avoid a hard floor (allows value to increase beyond expectations)
  const minRates = [24, 12, 0].map(r => ethers.parseUnits(r.toString(), 18));

  // allocations in SHCH (human units) — edit if desired or set PRESALE_ALLOCATIONS env var as CSV
  const defaultAlloc = [150000, 150000, 200000];
  const allocCsv = process.env.PRESALE_ALLOCATIONS || defaultAlloc.join(',');
  const allocParts = allocCsv.split(',').map(s => s.trim());
  const allocations = allocParts.map(a => ethers.parseUnits(a, 18));

  for (let i = 0; i < rates.length; i++) {
    const start = now + i * PHASE_LEN;
    const end = start + PHASE_LEN - 1;
    const allocation = allocations[i] || ethers.parseUnits('0', 18);
    const minRate = minRates[i] || rates[i];
    console.log(`Adding phase ${i}: start=${start}, end=${end}, rate=${rates[i].toString()}, allocation=${allocation.toString()}, minRate=${minRate.toString()}`);
    const tx = await presale.addPhase(start, end, rates[i], allocation, minRate);
    await tx.wait();
    console.log('Added phase', i, 'tx:', tx.hash);
  }
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
