# Shredchain Core

Shredchain is a blockchain-based platform built on Polygon featuring the $SHCH token, presale functionality, NFTs, mining game mechanics, and staking rewards.

## 🏗️ Project Overview

Shredchain Core includes:
- **$SHCH Token**: ERC-20 token with a maximum supply of 10 billion tokens
- **Presale Contract**: Multi-phase presale with dynamic pricing and MATIC/SHCH payment support
- **Mining Game**: Skateboarding-themed NFT mining game with upgradeable rigs
- **Staking**: Token staking with reward mechanisms
- **Athlete Photo NFTs**: NFT contract for athlete photo collectibles

## 📦 Smart Contracts

### SHCHToken.sol
Main ERC-20 token contract with:
- Maximum supply: 10,000,000,000 tokens
- Burnable functionality
- Owner-controlled minting (up to max supply)

### Presale.sol
Presale contract supporting:
- Multi-phase presales with configurable rates and allocations
- Dynamic pricing (linear rate decrease based on sold amount)
- Payment in MATIC or SHCH tokens
- Off-chain payment allocation for fiat/card purchases
- Phase management and fund withdrawal

### MiningGame.sol
Gamified NFT mining contract featuring:
- Purchase parts using $SHCH tokens
- Build mining rigs with hash power
- Mine $SHCH tokens based on hash power
- Special NFTs with enhanced rewards
- Upgrade mechanisms

### Staking.sol
Token staking contract with:
- Stake $SHCH tokens
- Earn rewards over time
- Configurable APY
- Withdraw staked tokens and claim rewards

### AthletePhotoNFT.sol
NFT contract for athlete photo collectibles with:
- Metadata for athlete name, fan name, and event
- Owner-controlled minting

## 🚀 Getting Started

### Prerequisites
- Node.js (24.x recommended)
- npm or yarn
- Hardhat

### Installation

```bash
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Configure your environment variables:
```
PRIVATE_KEY=your_private_key
POLYGON_RPC_URL=your_polygon_rpc_url
AMOY_RPC_URL=your_amoy_testnet_rpc_url
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

### Compilation

Compile the smart contracts:
```bash
npx hardhat compile
```

### Testing

Run the test suite:
```bash
npx hardhat test
```

### Deployment

Deploy to Polygon Amoy testnet:
```bash
npm run deploy:amoy
```

Deploy to Polygon mainnet:
```bash
npm run deploy:polygon
```

## 📝 Available Scripts

- `npm run deploy:amoy` - Deploy contracts to Amoy testnet
- `npm run deploy:polygon` - Deploy contracts to Polygon mainnet
- `npm run transfer` - Transfer tokens (Amoy network)
- `npm run check:token` - Check token information
- `npm run dev` - Run Next.js development server
- `npm run build` - Build Next.js application for production

## 🌐 Frontend

This project includes a Next.js frontend for interacting with the smart contracts.

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

The frontend will be exported as static files to the `out/` directory.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the GitHub repository.
