#!/usr/bin/env node
import { ethers } from 'ethers';
import fs from 'fs';

// Usage: node scripts/check-token.js <tokenAddress>
// Or set TOKEN_ADDRESS env var

const addr = process.argv[2] || process.env.TOKEN_ADDRESS;
if (!addr) {
  console.error('Usage: node scripts/check-token.js <tokenAddress>');
  process.exit(1);
}

const RPC = process.env.POLYGON_RPC_URL || 'https://rpc-amoy.polygon.technology/';
const provider = new ethers.JsonRpcProvider(RPC);

const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)'
];

async function main() {
  try {
    const token = new ethers.Contract(addr, ERC20_ABI, provider);
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      token.name(),
      token.symbol(),
      token.decimals(),
      token.totalSupply()
    ]);

    const human = ethers.formatUnits(totalSupply, decimals);
    console.log('Address:', addr);
    console.log('Name:', name);
    console.log('Symbol:', symbol);
    console.log('Decimals:', decimals);
    console.log('Total supply (raw):', totalSupply.toString());
    console.log('Total supply (human):', human);
  } catch (err) {
    console.error('Error querying token:', err.message || err);
    process.exitCode = 1;
  }
}

main();
