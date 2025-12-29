import { useState } from 'react';
import Link from 'next/link';

export default function MiningGame() {
  const [hashPower, setHashPower] = useState(0);
  const [mined, setMined] = useState(0);
  const [parts, setParts] = useState([]);
  const [upgradeAmount, setUpgradeAmount] = useState('');

  const generatePart = () => {
    const tricks = ['Kickflip', 'Ollie', 'Heelflip', '540 Spin', 'Frontside Grind'];
    const randomTrick = tricks[Math.floor(Math.random() * tricks.length)];
    const power = Math.floor(Math.random() * 30) + 20;
    setParts([...parts, { trick: randomTrick, power }]);
    setHashPower(hashPower + power);
  };

  const mine = () => {
    if (hashPower === 0) return alert('Build rig first!');
    const earned = Math.floor(hashPower / 10) + 1;
    setMined(mined + earned);
  };

  const upgrade = () => {
    if (!upgradeAmount || upgradeAmount <= 0) return alert('Enter $SHCH amount');
    setHashPower(hashPower + parseInt(upgradeAmount) * 10);
    setUpgradeAmount('');
    alert('Upgraded with $SHCH! (SHCH-only payments)');
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 text-center">
      <h1 className="text-5xl font-bold mb-8 text-purple-400">SHCH Mini Mining Game</h1>

      <button onClick={generatePart} className="bg-purple-600 px-8 py-4 rounded-lg text-xl mb-8">
        Generate Free NFT Part
      </button>

      <p className="text-lg mb-6">Note: Purchases use <strong>$SHCH</strong> only — MATIC is not accepted.</p>

      <p className="text-3xl mb-4">Hash Power: {hashPower}</p>

      <button onClick={mine} className="bg-green-600 text-4xl px-16 py-10 rounded-lg mb-12">
        MINE $SHCH
      </button>
      <p className="text-3xl mb-12">Mined: {mined} $SHCH</p>

      <input type="number" placeholder="$SHCH amount" value={upgradeAmount} onChange={e => setUpgradeAmount(e.target.value)} className="p-4 rounded text-black mb-6" />
      <button onClick={upgrade} className="bg-red-600 px-8 py-4 rounded-lg text-xl">
        Upgrade Rig
      </button>

      <Link href="/">
        <a className="block mt-12 bg-purple-600 px-8 py-4 rounded-lg text-xl">Back to Presale</a>
      </Link>
    </div>
  );
}
