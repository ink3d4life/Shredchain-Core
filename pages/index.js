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
