import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <Head>
        <title>Shredchain Presale</title>
      </Head>

      <h1 className="text-6xl font-bold text-purple-500 mb-8">SHREDCHAIN PRESALE</h1>
      <p className="text-3xl mb-4">Christmas Theme with Voodoo Dolls</p>
      <p className="text-4xl mb-12">"GET CURSED OR GET REKT – FINAL 19 DAYS"</p>
      <button className="bg-red-600 hover:bg-red-700 text-white text-3xl px-16 py-8 rounded-lg mb-12">
        Connect Wallet & Buy $SHCH
      </button>

      <div className="space-y-4">
        <Link href="/whitepaper">
          <a className="block bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-xl">Read Whitepaper</a>
        </Link>

        <Link href="/mining">
          <a className="block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl">Play SHCH Mini Mining Game</a>
        </Link>
      </div>
    </div>
  );
}
EOFcat > pages/whitepaper.js << 'EOF'
import Head from 'next/head';
import Link from 'next/link';

export default function Whitepaper() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <Head>
        <title>Shredchain Whitepaper</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center text-purple-500 mb-8">SHREDCHAIN WHITEPAPER</h1>
        <p className="text-center text-xl mb-12">By Mark C. Parnell Sr — Founder & Creative Architect | December 2025</p>

        <section className="mb-12 bg-purple-900/50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Tokenomics & Allocations</h2>
          <ul className="list-disc pl-8 text-lg">
            <li>Presale & Liquidity: 45%</li>
            <li>Staking Rewards: 20%</li>
            <li>Founder/Owner (vested 24 months): 10%</li>
            <li>Marketing & Partnerships: 10%</li>
            <li>Treasury (DAO-controlled): 15%</li>
          </ul>
        </section>

        <section className="mb-12 bg-purple-900/50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Roadmap</h2>
          <ul className="list-disc pl-8 text-lg">
            <li>Phase 1: Christmas presale, staking, mini mining game</li>
            <li>Phase 2: Governance, messaging, AI stats</li>
            <li>Phase 3: Wagering, photo scan, NFT battles</li>
          </ul>
        </section>

        <Link href="/">
          <a className="block text-center bg-red-600 text-white px-8 py-4 rounded-lg text-xl">Back to Presale</a>
        </Link>
      </div>
    </div>
  );
}
