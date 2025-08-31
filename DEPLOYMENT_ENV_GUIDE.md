# TrustBridge Protocol - Environment Configuration Guide

## Overview

This guide provides comprehensive environment configuration for deploying the TrustBridge Protocol, a decentralized healthcare data exchange platform built on Base blockchain.

## Project Analysis

Based on my analysis of the codebase, the project consists of:

1. **Smart Contracts** (Solidity) - Deployed on Base blockchain
2. **Frontend** (Next.js) - React application with Web3 integration
3. **Edge Functions** (Netlify) - Serverless functions for emergency access
4. **Subgraph** (The Graph) - Indexed blockchain data
5. **IPFS/Ceramic** - Decentralized storage
6. **Push Notifications** - VAPID-based notifications

## Environment Files Required

### 1. Main Application (.env.local)

Create `.env.local` in the root directory:

```bash
# =============================================================================
# APPLICATION CONFIGURATION
# =============================================================================
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=TrustBridge Protocol
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://your-domain.com

# =============================================================================
# BLOCKCHAIN CONFIGURATION (Base Network)
# =============================================================================
# Base Mainnet
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_EXPLORER_URL=https://basescan.org

# Base Sepolia (Testnet)
NEXT_PUBLIC_CHAIN_ID_TESTNET=84532
NEXT_PUBLIC_RPC_URL_TESTNET=https://sepolia.base.org
NEXT_PUBLIC_EXPLORER_URL_TESTNET=https://sepolia.basescan.org

# Deployment Private Key (KEEP SECURE!)
PRIVATE_KEY=your_deployment_private_key_here

# =============================================================================
# SMART CONTRACT ADDRESSES (Update after deployment)
# =============================================================================
NEXT_PUBLIC_USER_REGISTRY_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_CONSENT_MANAGEMENT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_HEALTH_RECORD_UPLOAD_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_PAYMENT_SETTLEMENT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_EMERGENCY_ACCESS_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_TBGT_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_SUBSCRIPTION_MANAGEMENT_ADDRESS=0x0000000000000000000000000000000000000000

# =============================================================================
# API ENDPOINTS & EXTERNAL SERVICES
# =============================================================================
# The Graph Subgraph
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.thegraph.com/subgraphs/name/your-subgraph-name

# IPFS Configuration
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs
NEXT_PUBLIC_IPFS_HOST=ipfs.infura.io
NEXT_PUBLIC_IPFS_AUTH=your_infura_ipfs_auth_token

# Ceramic Network
NEXT_PUBLIC_CERAMIC_NODE=https://ceramic-clay.3boxlabs.com
NEXT_PUBLIC_CERAMIC_URL=https://ceramic-clay.3boxlabs.com

# Edge Functions (Netlify)
NEXT_PUBLIC_EDGE_FUNCTIONS_URL=https://your-edge-functions.netlify.app/.netlify/functions

# Web3 Provider (Infura/Alchemy)
NEXT_PUBLIC_WEB3_PROVIDER=https://mainnet.infura.io/v3/your_project_id

# =============================================================================
# FEATURE FLAGS
# =============================================================================
NEXT_PUBLIC_LIBP2P_ENABLED=true
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_EMERGENCY_ACCESS_ENABLED=true
NEXT_PUBLIC_GOVERNANCE_ENABLED=true
NEXT_PUBLIC_RESEARCH_ACCESS_ENABLED=true
NEXT_PUBLIC_WRISTBAND_ENABLED=true
NEXT_PUBLIC_MOCK_DATA_ENABLED=false
NEXT_PUBLIC_DEBUG_MODE=false

# =============================================================================
# DEVELOPMENT & DEBUGGING
# =============================================================================
NEXT_PUBLIC_LOG_LEVEL=info
NEXT_PUBLIC_THEME_PREFERENCE=auto

# =============================================================================
# SECURITY & AUTHENTICATION
# =============================================================================
# JWT and Session Management
JWT_SECRET=your_super_secure_jwt_secret_key_here
SESSION_SECRET=your_session_secret_key_here
ENCRYPTION_KEY=your_32_character_encryption_key_here

# =============================================================================
# PUSH NOTIFICATIONS (VAPID)
# =============================================================================
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key_here
VAPID_PUBLIC_KEY=your_vapid_public_key_here
VAPID_PRIVATE_KEY=your_vapid_private_key_here
VAPID_EMAIL=notifications@yourdomain.com

# =============================================================================
# PAYMENT & COMMERCE
# =============================================================================
# Coinbase Commerce
NEXT_PUBLIC_COINBASE_API_KEY=your_coinbase_commerce_api_key
COINBASE_API_KEY=your_coinbase_commerce_api_key

# =============================================================================
# MONITORING & ANALYTICS
# =============================================================================
# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here

# =============================================================================
# HARDHAT CONFIGURATION
# =============================================================================
# Base Network RPC URLs
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# API Keys for Contract Verification
BASESCAN_API_KEY=your_basescan_api_key_here
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key_here

# Gas Reporting
REPORT_GAS=true

# =============================================================================
# DATABASE & STORAGE (if using external databases)
# =============================================================================
# MongoDB (if needed for additional data)
MONGODB_URI=your_mongodb_connection_string_here

# =============================================================================
# DEPLOYMENT PLATFORMS
# =============================================================================
# Vercel (if using Vercel for frontend)
VERCEL_PROJECT_ID=your_vercel_project_id
VERCEL_ORG_ID=your_vercel_org_id

# Netlify (if using Netlify for edge functions)
NETLIFY_SITE_ID=your_netlify_site_id
NETLIFY_ACCESS_TOKEN=your_netlify_access_token
```

### 2. Edge Functions (.env in edge/ directory)

Create `.env` in the `edge/` directory:

```bash
# =============================================================================
# EDGE FUNCTIONS CONFIGURATION
# =============================================================================
# Edge Function Private Key (for emergency access transactions)
EDGE_FUNCTION_PRIVATE_KEY=your_edge_function_private_key_here

# Base Network RPC URL
BASE_RPC_URL=https://mainnet.base.org

# Emergency Access Contract Address
EMERGENCY_ACCESS_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# =============================================================================
# PUSH NOTIFICATIONS (VAPID)
# =============================================================================
VAPID_PUBLIC_KEY=your_vapid_public_key_here
VAPID_PRIVATE_KEY=your_vapid_private_key_here
VAPID_EMAIL=notifications@yourdomain.com

# =============================================================================
# NETLIFY CONFIGURATION
# =============================================================================
# Netlify Site ID
NETLIFY_SITE_ID=your_netlify_site_id

# Netlify Access Token
NETLIFY_ACCESS_TOKEN=your_netlify_access_token

# =============================================================================
# SECURITY & AUTHENTICATION
# =============================================================================
# JWT Secret for edge function authentication
JWT_SECRET=your_edge_function_jwt_secret_here

# =============================================================================
# MONITORING
# =============================================================================
# Sentry DSN for error tracking
SENTRY_DSN=your_sentry_dsn_here
```

### 3. Subgraph Configuration

Update `subgraph/subgraph.yaml` with actual contract addresses after deployment.

## Required Services & API Keys

### 1. Blockchain Services
- **Base Network**: Configure wallet for Base mainnet (chain ID: 8453)
- **Basescan**: API key for contract verification
- **Infura/Alchemy**: RPC endpoint for Web3 provider

### 2. Decentralized Storage
- **IPFS**: Infura IPFS project or Pinata
- **Ceramic**: 3Box Labs Ceramic network

### 3. Data Indexing
- **The Graph**: Hosted service for subgraph deployment

### 4. Push Notifications
- **VAPID**: Generate VAPID keys for web push notifications

### 5. Payment Processing
- **Coinbase Commerce**: For cryptocurrency payments

### 6. Monitoring
- **Sentry**: Error tracking and monitoring

### 7. Deployment Platforms
- **Vercel**: Frontend deployment
- **Netlify**: Edge functions deployment

## Deployment Steps

### 1. Smart Contract Deployment

```bash
# Install dependencies
npm install

# Configure environment
cp env.example .env.local
# Edit .env.local with your values

# Deploy to Base Sepolia (testnet first)
npx hardhat run scripts/deploy.ts --network baseSepolia

# Deploy to Base Mainnet
npx hardhat run scripts/deploy.ts --network base

# Verify contracts
npx hardhat verify --network base CONTRACT_ADDRESS [constructor_args]
```

### 2. Update Contract Addresses

After deployment, update:
- `.env.local` with actual contract addresses
- `src/constants/index.ts` with contract addresses
- `subgraph/subgraph.yaml` with contract addresses and start blocks

### 3. Deploy Subgraph

```bash
cd subgraph

# Install dependencies
npm install

# Generate types
npm run codegen

# Build subgraph
npm run build

# Deploy to The Graph
npm run deploy
```

### 4. Deploy Edge Functions

```bash
cd edge

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your values

# Deploy to Netlify
npm run deploy
```

### 5. Deploy Frontend

```bash
# Build application
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to IPFS
npm run deploy:ipfs
```

## Security Considerations

1. **Private Keys**: Never commit private keys to version control
2. **Environment Files**: Add `.env*` to `.gitignore`
3. **API Keys**: Use different keys for development and production
4. **Access Control**: Enable 2FA on all service accounts
5. **Monitoring**: Set up alerts for suspicious activity
6. **Key Rotation**: Regularly rotate API keys and secrets

## Environment Variable Reference

### Frontend Variables (NEXT_PUBLIC_*)
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NEXT_PUBLIC_CHAIN_ID`: Base network chain ID
- `NEXT_PUBLIC_RPC_URL`: Base network RPC endpoint
- `NEXT_PUBLIC_*_ADDRESS`: Smart contract addresses
- `NEXT_PUBLIC_GRAPHQL_ENDPOINT`: The Graph subgraph endpoint
- `NEXT_PUBLIC_IPFS_GATEWAY`: IPFS gateway URL
- `NEXT_PUBLIC_CERAMIC_URL`: Ceramic network URL
- `NEXT_PUBLIC_EDGE_FUNCTIONS_URL`: Netlify edge functions URL
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`: VAPID public key for push notifications
- `NEXT_PUBLIC_*_ENABLED`: Feature flags

### Backend Variables
- `PRIVATE_KEY`: Deployment wallet private key
- `JWT_SECRET`: JWT signing secret
- `SESSION_SECRET`: Session encryption secret
- `VAPID_PRIVATE_KEY`: VAPID private key
- `EDGE_FUNCTION_PRIVATE_KEY`: Edge function wallet private key
- `GRAPH_ACCESS_TOKEN`: The Graph access token

### Service API Keys
- `BASESCAN_API_KEY`: Basescan API key for contract verification
- `COINMARKETCAP_API_KEY`: CoinMarketCap API key for gas reporting
- `COINBASE_API_KEY`: Coinbase Commerce API key
- `SENTRY_DSN`: Sentry error tracking DSN

## Troubleshooting

### Common Issues

1. **Contract Deployment Fails**
   - Check private key format and balance
   - Verify RPC endpoint is accessible
   - Ensure sufficient gas for deployment

2. **Subgraph Deployment Issues**
   - Verify Graph access token
   - Check contract addresses in subgraph.yaml
   - Ensure contracts are deployed and verified

3. **Edge Functions Not Working**
   - Verify Netlify configuration
   - Check environment variables in Netlify dashboard
   - Ensure edge function private key has sufficient balance

4. **Frontend Build Errors**
   - Check all required environment variables are set
   - Verify contract addresses are correct
   - Ensure all dependencies are installed

### Support

For deployment issues, check:
1. Base network documentation
2. The Graph documentation
3. Netlify edge functions documentation
4. Vercel deployment documentation

## Conclusion

This environment configuration covers all aspects of the TrustBridge Protocol deployment. Ensure all variables are properly set before deployment and maintain security best practices throughout the process.
