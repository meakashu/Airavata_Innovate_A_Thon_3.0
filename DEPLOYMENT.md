# TrustBridge Protocol - Complete Deployment Guide

## 🚀 Overview

This guide provides comprehensive instructions for deploying the TrustBridge Protocol, a fully decentralized healthcare data exchange platform built on Base blockchain with advanced privacy-preserving features.

## 📋 Prerequisites

### Required Software
- Node.js 18+ and npm 9+
- Git
- Docker (optional, for containerized deployment)
- MetaMask or compatible Web3 wallet
- Base network configured in wallet

### Required Accounts & API Keys
- [The Graph](https://thegraph.com/) account
- [IPFS](https://ipfs.io/) project (Pinata, Infura, or similar)
- [Ceramic](https://ceramic.network/) account
- [Netlify](https://netlify.com/) account (for edge functions)
- [Vercel](https://vercel.com/) or [Fleek](https://fleek.co/) account (for frontend)
- [Alchemy](https://alchemy.com/) or [Infura](https://infura.io/) account
- [Coinbase Commerce](https://commerce.coinbase.com/) account
- [Sentry](https://sentry.io/) account (for monitoring)

## 🔧 Environment Configuration

### 1. Create Environment Files

Create `.env.local` in the root directory:

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=TrustBridge Protocol
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_EXPLORER_URL=https://basescan.org

# Contract Addresses (Update after deployment)
NEXT_PUBLIC_USER_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_CONSENT_MANAGEMENT_ADDRESS=0x...
NEXT_PUBLIC_HEALTH_RECORD_UPLOAD_ADDRESS=0x...
NEXT_PUBLIC_PAYMENT_SETTLEMENT_ADDRESS=0x...
NEXT_PUBLIC_EMERGENCY_ACCESS_ADDRESS=0x...
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x...
NEXT_PUBLIC_TBGT_TOKEN_ADDRESS=0x...

# API Endpoints
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.thegraph.com/subgraphs/name/your-subgraph
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs
NEXT_PUBLIC_CERAMIC_NODE=https://ceramic-clay.3boxlabs.com
NEXT_PUBLIC_EDGE_FUNCTIONS_URL=https://your-edge-functions.netlify.app/.netlify/functions

# Feature Flags
NEXT_PUBLIC_LIBP2P_ENABLED=true
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_EMERGENCY_ACCESS_ENABLED=true
NEXT_PUBLIC_GOVERNANCE_ENABLED=true
NEXT_PUBLIC_RESEARCH_ACCESS_ENABLED=true
NEXT_PUBLIC_WRISTBAND_ENABLED=true

# Security
JWT_SECRET=your-super-secure-jwt-secret
ENCRYPTION_KEY=your-32-character-encryption-key
SESSION_SECRET=your-session-secret

# Push Notifications
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
VAPID_EMAIL=notifications@yourdomain.com
```

### 2. Create Edge Functions Environment

Create `.env` in the `edge/` directory:

```bash
# Edge Functions Configuration
EDGE_FUNCTION_PRIVATE_KEY=your-edge-function-private-key
BASE_RPC_URL=https://mainnet.base.org
EMERGENCY_ACCESS_CONTRACT_ADDRESS=0x...
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
VAPID_EMAIL=notifications@yourdomain.com
```

## 🏗️ Smart Contract Deployment

### 1. Deploy to Base Mainnet

```bash
# Install dependencies
npm install

# Configure Hardhat
cp hardhat.config.ts.example hardhat.config.ts
# Edit hardhat.config.ts with your configuration

# Deploy contracts
npm run deploy:contracts

# Verify contracts
npm run verify
```

### 2. Update Contract Addresses

After deployment, update the contract addresses in:
- `.env.local`
- `src/constants/index.ts`
- `subgraph/subgraph.yaml`

## 📊 The Graph Subgraph Deployment

### 1. Initialize Subgraph

```bash
cd subgraph

# Install dependencies
npm install

# Generate types
npm run codegen

# Build subgraph
npm run build
```

### 2. Deploy Subgraph

```bash
# Authenticate with The Graph
npm run auth

# Deploy to hosted service
npm run deploy
```

### 3. Update Subgraph Configuration

Update `subgraph/subgraph.yaml` with actual contract addresses and start blocks.

## 🔧 Edge Functions Deployment

### 1. Deploy to Netlify

```bash
cd edge

# Install dependencies
npm install

# Deploy functions
npm run deploy
```

### 2. Configure Edge Functions

- Set up environment variables in Netlify dashboard
- Configure custom domain
- Set up webhook endpoints

## 🌐 Frontend Deployment

### Option 1: Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Option 2: Fleek Deployment (IPFS)

```bash
# Build the application
npm run build

# Deploy to IPFS via Fleek
npm run deploy:ipfs
```

### Option 3: Traditional Hosting

```bash
# Build the application
npm run build

# Upload build files to your hosting provider
```

## 🔐 Security Configuration

### 1. SSL/TLS Setup

Ensure HTTPS is enabled on all domains:
- Main application
- Edge functions
- API endpoints

### 2. Security Headers

Configure security headers in your hosting platform:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### 3. CORS Configuration

Configure CORS for your domains:

```javascript
const corsOptions = {
  origin: ['https://yourdomain.com', 'https://api.yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
};
```

## 📱 PWA Configuration

### 1. Service Worker

Ensure `public/sw.js` is properly configured for offline functionality.

### 2. Manifest

Update `public/manifest.json` with your application details.

### 3. Icons

Add appropriate icons in `public/` directory:
- `icon-192x192.png`
- `icon-512x512.png`
- `apple-touch-icon.png`

## 🔍 Monitoring & Analytics

### 1. Sentry Setup

```javascript
// In _app.tsx
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 2. Analytics Setup

Configure analytics in your hosting platform or use external services.

### 3. Health Checks

Implement health check endpoints:

```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION
  });
}
```

## 🧪 Testing

### 1. Unit Tests

```bash
npm run test
```

### 2. Integration Tests

```bash
npm run test:e2e
```

### 3. Accessibility Tests

```bash
npm run test:accessibility
```

## 📈 Performance Optimization

### 1. Bundle Analysis

```bash
npm run build
npm run analyze
```

### 2. Image Optimization

- Use Next.js Image component
- Implement lazy loading
- Optimize image formats

### 3. Caching Strategy

- Implement proper cache headers
- Use CDN for static assets
- Configure service worker caching

## 🔄 CI/CD Pipeline

### 1. GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy TrustBridge Protocol

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - run: npm run deploy:all
```

### 2. Environment Variables

Set up environment variables in your CI/CD platform.

## 🚨 Emergency Procedures

### 1. Rollback Plan

- Keep previous deployments accessible
- Implement feature flags for critical features
- Maintain database backups

### 2. Incident Response

- Set up monitoring alerts
- Document incident response procedures
- Maintain emergency contact list

## 📚 Post-Deployment Checklist

- [ ] All contracts deployed and verified
- [ ] Subgraph deployed and syncing
- [ ] Edge functions deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] SSL certificates configured
- [ ] Security headers implemented
- [ ] Monitoring and analytics configured
- [ ] Performance optimized
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Team trained on new features
- [ ] Backup procedures tested
- [ ] Emergency procedures documented

## 🔗 Useful Links

- [Base Documentation](https://docs.base.org/)
- [The Graph Documentation](https://thegraph.com/docs/)
- [IPFS Documentation](https://docs.ipfs.io/)
- [Ceramic Documentation](https://developers.ceramic.network/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Vercel Documentation](https://vercel.com/docs)

## 🆘 Support

For deployment issues or questions:
1. Check the troubleshooting section
2. Review logs and error messages
3. Consult the documentation
4. Contact the development team

---

**Note**: This deployment guide assumes you have the necessary permissions and access to all required services. Always follow security best practices and keep sensitive information secure.
