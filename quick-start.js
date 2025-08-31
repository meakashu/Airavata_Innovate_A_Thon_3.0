#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const crypto = require('crypto');

console.log('🚀 TrustBridge Protocol - Quick Start Setup\n');

// Generate minimal environment for development
const devEnv = `# TrustBridge Protocol - Development Environment
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=TrustBridge Protocol
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Base Network Configuration
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_RPC_URL=https://sepolia.base.org
NEXT_PUBLIC_EXPLORER_URL=https://sepolia.basescan.org

# Development Settings
NEXT_PUBLIC_MOCK_DATA_ENABLED=true
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_LEVEL=debug

# Security Keys (Generated)
JWT_SECRET=${crypto.randomBytes(64).toString('hex')}
SESSION_SECRET=${crypto.randomBytes(32).toString('hex')}
ENCRYPTION_KEY=${crypto.randomBytes(16).toString('hex')}

# Feature Flags
NEXT_PUBLIC_LIBP2P_ENABLED=true
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_EMERGENCY_ACCESS_ENABLED=true
NEXT_PUBLIC_GOVERNANCE_ENABLED=true
NEXT_PUBLIC_RESEARCH_ACCESS_ENABLED=true
NEXT_PUBLIC_WRISTBAND_ENABLED=true

# Placeholder Contract Addresses (Update after deployment)
NEXT_PUBLIC_USER_REGISTRY_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_CONSENT_MANAGEMENT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_HEALTH_RECORD_UPLOAD_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_PAYMENT_SETTLEMENT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_EMERGENCY_ACCESS_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_TBGT_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_SUBSCRIPTION_MANAGEMENT_ADDRESS=0x0000000000000000000000000000000000000000

# Development API Keys (Add your own)
NEXT_PUBLIC_WEB3_PROVIDER=https://sepolia.base.org
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io
NEXT_PUBLIC_CERAMIC_NODE=https://ceramic-clay.3boxlabs.com
NEXT_PUBLIC_CERAMIC_URL=https://ceramic-clay.3boxlabs.com
`;

function runCommand(command, description) {
  try {
    console.log(`📦 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} failed: ${error.message}`);
    return false;
  }
}

async function quickStart() {
  try {
    console.log('🔧 Setting up development environment...\n');

    // Create .env.local for development
    if (!fs.existsSync('.env.local')) {
      fs.writeFileSync('.env.local', devEnv);
      console.log('✅ Created .env.local for development');
    } else {
      console.log('⚠️  .env.local already exists, skipping...');
    }

    // Install dependencies
    if (!runCommand('npm install', 'Installing dependencies')) {
      console.log('❌ Failed to install dependencies. Please run: npm install');
      return;
    }

    // Install subgraph dependencies
    if (fs.existsSync('subgraph')) {
      console.log('📦 Installing subgraph dependencies...');
      try {
        execSync('cd subgraph && npm install', { stdio: 'inherit' });
        console.log('✅ Subgraph dependencies installed');
      } catch (error) {
        console.log('⚠️  Subgraph dependencies installation failed, continuing...');
      }
    }

    // Install edge functions dependencies
    if (fs.existsSync('edge')) {
      console.log('📦 Installing edge functions dependencies...');
      try {
        execSync('cd edge && npm install', { stdio: 'inherit' });
        console.log('✅ Edge functions dependencies installed');
      } catch (error) {
        console.log('⚠️  Edge functions dependencies installation failed, continuing...');
      }
    }

    // Build the application
    if (!runCommand('npm run build', 'Building application')) {
      console.log('❌ Build failed. Please check for errors.');
      return;
    }

    console.log('\n🎉 Quick start setup completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Add Base Sepolia network to MetaMask:');
    console.log('   - Network Name: Base Sepolia');
    console.log('   - RPC URL: https://sepolia.base.org');
    console.log('   - Chain ID: 84532');
    console.log('   - Currency Symbol: ETH');
    console.log('   - Block Explorer: https://sepolia.basescan.org');
    console.log('\n2. Get test ETH from Base Sepolia faucet:');
    console.log('   https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet');
    console.log('\n3. Start the development server:');
    console.log('   npm run dev');
    console.log('\n4. Open http://localhost:3000 in your browser');
    console.log('\n5. Connect your MetaMask wallet');
    console.log('\n📖 For full production setup, see SETUP_GUIDE.md');

  } catch (error) {
    console.error('❌ Quick start failed:', error.message);
  }
}

// Run quick start
quickStart();
