import { ethers } from 'ethers';
import fs from 'fs';

const AMOY_RPC = 'https://rpc-amoy.polygon.technology/';
const POLYGONSCAN_AMOY_API = 'https://api-amoy.polygonscan.com/api';

const presaleAddresses = [
  '0x311145fF50b2cEd48EBa95c0C7a561d45C172B2e',
  '0x411A8f2302dF1faC39902b250c99d9a78C7f3a13'
];

const SHCH = '0x455a4D53808bF34f6EBfa626935405758f04E967';

const provider = new ethers.JsonRpcProvider(AMOY_RPC);

async function checkOwner(address) {
  // Try to call owner() if present
  const abi = ['function owner() view returns (address)'];
  const c = new ethers.Contract(address, abi, provider);
  try {
    const owner = await c.owner();
    return owner;
  } catch (err) {
    return null;
  }
}

async function checkTokenBalance(tokenAddr, holder) {
  const abi = ['function balanceOf(address) view returns (uint256)'];
  const t = new ethers.Contract(tokenAddr, abi, provider);
  try {
    const bal = await t.balanceOf(holder);
    return bal.toString();
  } catch (err) {
    return null;
  }
}

async function checkVerifiedOnPolygonscan(address, apiKey) {
  const url = `${POLYGONSCAN_AMOY_API}?module=contract&action=getsourcecode&address=${address}&apikey=${apiKey}`;
  try {
    const res = await fetch(url);
    const j = await res.json();
    if (j.status === '1' && j.result && j.result.length > 0) {
      const r = j.result[0];
      return { SourceCode: r.SourceCode, ABI: r.ABI, ContractName: r.ContractName };
    }
    return null;
  } catch (err) {
    return null;
  }
}

async function main() {
  const apiKey = process.env.POLYGONSCAN_API_KEY || '';
  const out = [];
  for (const a of presaleAddresses) {
    console.log('Checking', a);
    const owner = await checkOwner(a);
    const shchBal = await checkTokenBalance(SHCH, a);
    const verified = apiKey ? await checkVerifiedOnPolygonscan(a, apiKey) : null;
    out.push({ address: a, owner, shchBalance: shchBal, verified: !!verified });
    console.log({ address: a, owner, shchBalance: shchBal, verified: !!verified });
  }

  fs.writeFileSync('presale-check.json', JSON.stringify(out, null, 2));
  console.log('Wrote presale-check.json');
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
