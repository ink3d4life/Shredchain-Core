import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-indigo-900 text-white flex flex-col items-center justify-center p-8">
      <Head>
        <title>Shredchain — New Years Presale</title>
      </Head>

      <h1 className="text-6xl font-extrabold text-yellow-400 mb-6">SHREDCHAIN NEW YEARS PARTY</h1>
      <p className="text-2xl mb-4 text-slate-300">Ring in the new year with SHCH — limited presale drops & party perks</p>
      <p className="text-xl mb-8 text-yellow-200">Celebrate 2026: confetti, limited NFTs, and exclusive mint drops</p>

      <button className="bg-yellow-500 hover:bg-yellow-600 text-black text-2xl px-12 py-6 rounded-full mb-10">
        Connect Wallet & Join The Party
      </button>

      <div className="flex gap-4">
        <Link href="/whitepaper">
          <a className="block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg">Read Whitepaper</a>
        </Link>

        <Link href="/mining">
          <a className="block bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-lg text-lg">Play Mini Mining Game</a>
        </Link>
      </div>
    </div>
