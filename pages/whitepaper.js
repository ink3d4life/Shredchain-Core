import Head from 'next/head';
import Link from 'next/link';

export default function Whitepaper() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <Head>
        <title>Shredchain Whitepaper</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center text-yellow-400 mb-8">SHREDCHAIN WHITEPAPER</h1>
        <p className="text-center text-xl mb-12">By Mark C. Parnell Sr — Founder & Creative Architect | December 2025 — New Years Edition</p>

        <section className="mb-12 bg-indigo-900/40 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Tokenomics & Allocations</h2>
          <ul className="list-disc pl-8 text-lg">
            <li>Presale & Liquidity: 45%</li>
            <li>Staking Rewards: 20%</li>
            <li>Founder/Owner (vested 24 months): 10%</li>
            <li>Marketing & Partnerships: 10%</li>
            <li>Treasury (DAO-controlled): 15%</li>
          </ul>
        </section>

        <section className="mb-12 bg-indigo-900/40 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Roadmap</h2>
          <ul className="list-disc pl-8 text-lg">
            <li>Phase 1: New Years presale, staking, mini mining game</li>
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
