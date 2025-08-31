# TrustBridge Protocol - Complete Setup Guide

## 🚀 Quick Start Setup

This guide will walk you through setting up all API keys, tokens, and configurations needed to run the TrustBridge Protocol application in real-time.

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- A Web3 wallet (MetaMask recommended)
- Base Network configured in your wallet

## 🔧 Step 1: Environment Configuration

### 1.1 Create Environment File

```bash
# Copy the example environment file
cp env.example .env.local
```

### 1.2 Base Network Setup

First, add Base Network to your MetaMask:

**Base Mainnet:**
- Network Name: Base
- RPC URL: https://mainnet.base.org
- Chain ID: 8453
- Currency Symbol: ETH
- Block Explorer: https://basescan.org

**Base Sepolia (Testnet):**
- Network Name: Base Sepolia
- RPC URL: https://sepolia.base.org
- Chain ID: 84532
- Currency Symbol: ETH
- Block Explorer: https://sepolia.basescan.org

## 🔑 Step 2: API Keys & Services Setup

### 2.1 Infura Setup (Web3 Provider)

1. Go to [Infura.io](https://infura.io)
2. Create a free account
3. Create a new project
4. Copy your Project ID
5. Update `.env.local`:

```env
NEXT_PUBLIC_WEB3_PROVIDER=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
```

### 2.2 IPFS Setup (File Storage)

#### Option A: Infura IPFS (Recommended)
1. In your Infura project, enable IPFS
2. Get your IPFS Auth Token
3. Update `.env.local`:

```env
NEXT_PUBLIC_IPFS_HOST=ipfs.infura.io
NEXT_PUBLIC_IPFS_AUTH=YOUR_INFURA_IPFS_AUTH_TOKEN
```

#### Option B: Pinata (Alternative)
1. Go to [Pinata.cloud](https://pinata.cloud)
2. Create account and get API key
3. Update `.env.local`:

```env
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud
NEXT_PUBLIC_IPFS_AUTH=YOUR_PINATA_API_KEY
```

### 2.3 The Graph Setup (Blockchain Indexing)

1. Go to [The Graph](https://thegraph.com)
2. Create account and get access token
3. Deploy your subgraph (see subgraph deployment guide)
4. Update `.env.local`:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.thegraph.com/subgraphs/name/YOUR_USERNAME/YOUR_SUBGRAPH_NAME
GRAPH_ACCESS_TOKEN=YOUR_GRAPH_ACCESS_TOKEN
```

### 2.4 Ceramic Network Setup (DID Management)

1. Go to [Ceramic.network](https://ceramic.network)
2. Create account and get node URL
3. Update `.env.local`:

```env
NEXT_PUBLIC_CERAMIC_NODE=https://ceramic-clay.3boxlabs.com
NEXT_PUBLIC_CERAMIC_URL=https://ceramic-clay.3boxlabs.com
```

### 2.5 Coinbase Commerce Setup (Payments)

1. Go to [Coinbase Commerce](https://commerce.coinbase.com)
2. Create account and get API key
3. Update `.env.local`:

```env
NEXT_PUBLIC_COINBASE_API_KEY=YOUR_COINBASE_COMMERCE_API_KEY
COINBASE_API_KEY=YOUR_COINBASE_COMMERCE_API_KEY
```

### 2.6 Sentry Setup (Error Tracking)

1. Go to [Sentry.io](https://sentry.io)
2. Create account and project
3. Get your DSN
4. Update `.env.local`:

```env
NEXT_PUBLIC_SENTRY_DSN=YOUR_SENTRY_DSN
```

### 2.7 VAPID Keys Setup (Push Notifications)

1. Generate VAPID keys using this command:

```bash
npx web-push generate-vapid-keys
```

2. Update `.env.local`:

```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=YOUR_VAPID_PUBLIC_KEY
VAPID_PUBLIC_KEY=YOUR_VAPID_PUBLIC_KEY
VAPID_PRIVATE_KEY=YOUR_VAPID_PRIVATE_KEY
VAPID_EMAIL=notifications@yourdomain.com
```

### 2.8 BaseScan API Key (Contract Verification)

1. Go to [BaseScan](https://basescan.org)
2. Create account and get API key
3. Update `.env.local`:

```env
BASESCAN_API_KEY=YOUR_BASESCAN_API_KEY
```

## 🏗️ Step 3: Smart Contract Deployment

### 3.1 Generate Deployment Key

```bash
# Generate a new private key for deployment
npx hardhat generate-account
```

### 3.2 Fund Your Deployment Account

1. Get some Base ETH from [Base Bridge](https://bridge.base.org)
2. Or use Base Sepolia faucet for testnet

### 3.3 Deploy Contracts

```bash
# Install dependencies
npm install

# Deploy to Base Sepolia (testnet first)
npx hardhat deploy --network base-sepolia

# Deploy to Base Mainnet (production)
npx hardhat deploy --network base-mainnet
```

### 3.4 Update Contract Addresses

After deployment, update `.env.local` with the deployed contract addresses:

```env
NEXT_PUBLIC_USER_REGISTRY_ADDRESS=0x... # Deployed address
NEXT_PUBLIC_CONSENT_MANAGEMENT_ADDRESS=0x... # Deployed address
NEXT_PUBLIC_HEALTH_RECORD_UPLOAD_ADDRESS=0x... # Deployed address
NEXT_PUBLIC_PAYMENT_SETTLEMENT_ADDRESS=0x... # Deployed address
NEXT_PUBLIC_EMERGENCY_ACCESS_ADDRESS=0x... # Deployed address
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x... # Deployed address
NEXT_PUBLIC_TBGT_TOKEN_ADDRESS=0x... # Deployed address
NEXT_PUBLIC_SUBSCRIPTION_MANAGEMENT_ADDRESS=0x... # Deployed address
```

## 🔐 Step 4: Security Configuration

### 4.1 Generate Security Keys

```bash
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate Session Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate Encryption Key (32 characters)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### 4.2 Update Security Keys

```env
JWT_SECRET=YOUR_GENERATED_JWT_SECRET
SESSION_SECRET=YOUR_GENERATED_SESSION_SECRET
ENCRYPTION_KEY=YOUR_GENERATED_ENCRYPTION_KEY
```

## 🚀 Step 5: Application Setup

### 5.1 Install Dependencies

```bash
# Install all dependencies
npm install

# Install subgraph dependencies
cd subgraph && npm install && cd ..

# Install edge functions dependencies
cd edge && npm install && cd ..
```

### 5.2 Build the Application

```bash
# Build the main application
npm run build

# Build subgraph
cd subgraph && npm run build && cd ..

# Build edge functions
cd edge && npm run build && cd ..
```

### 5.3 Start Development Server

```bash
# Start the development server
npm run dev
```

## 🌐 Step 6: Subgraph Deployment

### 6.1 Authenticate with The Graph

```bash
# Install Graph CLI
npm install -g @graphprotocol/graph-cli

# Authenticate
graph auth --product hosted-service YOUR_GRAPH_ACCESS_TOKEN
```

### 6.2 Deploy Subgraph

```bash
cd subgraph

# Create subgraph
graph create --node https://api.thegraph.com/deploy/ YOUR_USERNAME/trustbridge-protocol

# Deploy subgraph
graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ YOUR_USERNAME/trustbridge-protocol
```

## 🔧 Step 7: Edge Functions Deployment

### 7.1 Netlify Setup

1. Go to [Netlify](https://netlify.com)
2. Create account and new site
3. Connect your repository
4. Get site ID and access token

### 7.2 Update Edge Function Config

```env
NETLIFY_SITE_ID=YOUR_NETLIFY_SITE_ID
NETLIFY_ACCESS_TOKEN=YOUR_NETLIFY_ACCESS_TOKEN
```

### 7.3 Deploy Edge Functions

```bash
cd edge

# Deploy to Netlify
npm run deploy
```

## ✅ Step 8: Verification & Testing

### 8.1 Test Wallet Connection

1. Open http://localhost:3000
2. Connect your MetaMask wallet
3. Ensure you're on Base Network
4. Test wallet connection

### 8.2 Test Core Features

1. **User Registration**: Register as a patient/provider
2. **Health Records**: Upload a test health record
3. **Consent Management**: Create and manage consents
4. **Payments**: Test payment flow
5. **Emergency Access**: Test emergency protocols

### 8.3 Monitor Logs

```bash
# Check application logs
npm run dev

# Check for any errors in browser console
# Check network requests in browser dev tools
```

## 🔍 Step 9: Production Deployment

### 9.1 Vercel Deployment (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Set environment variables in Vercel dashboard
4. Deploy

### 9.2 Environment Variables in Vercel

Copy all variables from `.env.local` to Vercel environment variables.

### 9.3 Custom Domain Setup

1. Add custom domain in Vercel
2. Update DNS records
3. Update `NEXT_PUBLIC_APP_URL` in environment

## 🛠️ Troubleshooting

### Common Issues

1. **Wallet Connection Failed**
   - Ensure MetaMask is installed
   - Check if you're on Base Network
   - Clear browser cache

2. **IPFS Upload Failed**
   - Verify IPFS API key
   - Check network connectivity
   - Try alternative IPFS provider

3. **Contract Interaction Failed**
   - Verify contract addresses
   - Check if contracts are deployed
   - Ensure sufficient gas fees

4. **Subgraph Not Working**
   - Verify GraphQL endpoint
   - Check subgraph deployment status
   - Ensure subgraph is synced

### Debug Mode

Enable debug mode for troubleshooting:

```env
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_LEVEL=debug
```

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all API keys are correct
3. Ensure all services are properly configured
4. Check network connectivity
5. Review the troubleshooting section above

## 🔒 Security Checklist

- [ ] All API keys are secure and not committed to git
- [ ] Private keys are stored securely
- [ ] Environment variables are properly set
- [ ] HTTPS is enabled in production
- [ ] Regular security audits are performed
- [ ] Keys are rotated regularly

## 🎉 Success!

Once all steps are completed, your TrustBridge Protocol application should be fully functional with:

- ✅ Real-time blockchain interactions
- ✅ IPFS file storage
- ✅ Push notifications
- ✅ Payment processing
- ✅ Emergency access protocols
- ✅ Governance features
- ✅ Analytics and monitoring

Your application is now ready for production use! 🚀
