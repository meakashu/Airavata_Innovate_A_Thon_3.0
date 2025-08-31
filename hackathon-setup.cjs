#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const crypto = require('crypto');

console.log('🏆 TrustBridge Protocol - Hackathon Setup\n');

// Generate comprehensive environment for hackathon demo
const hackathonEnv = `# TrustBridge Protocol - Hackathon Demo Environment
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=TrustBridge Protocol
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Base Network Configuration (Testnet for Demo)
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_RPC_URL=https://sepolia.base.org
NEXT_PUBLIC_EXPLORER_URL=https://sepolia.basescan.org

# Development Settings (Optimized for Demo)
NEXT_PUBLIC_MOCK_DATA_ENABLED=true
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_LEVEL=info
NEXT_PUBLIC_DEMO_MODE=true

# Security Keys (Generated for Demo)
JWT_SECRET=${crypto.randomBytes(64).toString('hex')}
SESSION_SECRET=${crypto.randomBytes(32).toString('hex')}
ENCRYPTION_KEY=${crypto.randomBytes(16).toString('hex')}

# Feature Flags (All Enabled for Demo)
NEXT_PUBLIC_LIBP2P_ENABLED=true
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_EMERGENCY_ACCESS_ENABLED=true
NEXT_PUBLIC_GOVERNANCE_ENABLED=true
NEXT_PUBLIC_RESEARCH_ACCESS_ENABLED=true
NEXT_PUBLIC_WRISTBAND_ENABLED=true
NEXT_PUBLIC_PAYMENT_ENABLED=true
NEXT_PUBLIC_NOTIFICATIONS_ENABLED=true

# Demo Contract Addresses (Mock for Hackathon)
NEXT_PUBLIC_USER_REGISTRY_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_CONSENT_MANAGEMENT_ADDRESS=0x2345678901234567890123456789012345678901
NEXT_PUBLIC_HEALTH_RECORD_UPLOAD_ADDRESS=0x3456789012345678901234567890123456789012
NEXT_PUBLIC_PAYMENT_SETTLEMENT_ADDRESS=0x4567890123456789012345678901234567890123
NEXT_PUBLIC_EMERGENCY_ACCESS_ADDRESS=0x5678901234567890123456789012345678901234
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x6789012345678901234567890123456789012345
NEXT_PUBLIC_TBGT_TOKEN_ADDRESS=0x7890123456789012345678901234567890123456
NEXT_PUBLIC_SUBSCRIPTION_MANAGEMENT_ADDRESS=0x8901234567890123456789012345678901234567

# Demo API Keys (Public Services for Hackathon)
NEXT_PUBLIC_WEB3_PROVIDER=https://sepolia.base.org
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io
NEXT_PUBLIC_CERAMIC_NODE=https://ceramic-clay.3boxlabs.com
NEXT_PUBLIC_CERAMIC_URL=https://ceramic-clay.3boxlabs.com

# Demo Data Configuration
NEXT_PUBLIC_DEMO_PATIENTS=5
NEXT_PUBLIC_DEMO_PROVIDERS=3
NEXT_PUBLIC_DEMO_RESEARCHERS=2
NEXT_PUBLIC_DEMO_RECORDS=10
NEXT_PUBLIC_DEMO_CONSENTS=8

# Performance Optimization
NEXT_PUBLIC_CACHE_ENABLED=true
NEXT_PUBLIC_LAZY_LOADING=true
NEXT_PUBLIC_OPTIMIZATION_MODE=true
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

async function hackathonSetup() {
  try {
    console.log('🔧 Setting up TrustBridge Protocol for Hackathon Demo...\n');

    // Create optimized .env.local for hackathon
    if (!fs.existsSync('.env.local')) {
      fs.writeFileSync('.env.local', hackathonEnv);
      console.log('✅ Created .env.local optimized for hackathon demo');
    } else {
      console.log('⚠️  .env.local already exists, updating for hackathon...');
      fs.writeFileSync('.env.local', hackathonEnv);
      console.log('✅ Updated .env.local for hackathon demo');
    }

    // Install dependencies if needed
    if (!fs.existsSync('node_modules')) {
      if (!runCommand('npm install', 'Installing dependencies')) {
        console.log('❌ Failed to install dependencies. Please run: npm install');
        return;
      }
    } else {
      console.log('✅ Dependencies already installed');
    }

    // Create demo data directory
    if (!fs.existsSync('demo-data')) {
      fs.mkdirSync('demo-data');
      console.log('✅ Created demo-data directory');
    }

    // Create demo data files
    const demoData = {
      patients: [
        { id: 1, name: 'Alice Johnson', role: 'Patient', wallet: '0x1234...5678' },
        { id: 2, name: 'Bob Smith', role: 'Patient', wallet: '0x2345...6789' },
        { id: 3, name: 'Carol Davis', role: 'Patient', wallet: '0x3456...7890' }
      ],
      providers: [
        { id: 1, name: 'Dr. Sarah Wilson', role: 'Provider', wallet: '0x4567...8901' },
        { id: 2, name: 'Dr. Michael Brown', role: 'Provider', wallet: '0x5678...9012' }
      ],
      researchers: [
        { id: 1, name: 'Dr. Emily Chen', role: 'Researcher', wallet: '0x6789...0123' }
      ]
    };

    fs.writeFileSync('demo-data/users.json', JSON.stringify(demoData, null, 2));
    console.log('✅ Created demo user data');

    // Create demo health records
    const healthRecords = [
      { id: 1, patientId: 1, type: 'Blood Test', date: '2024-01-15', status: 'Active' },
      { id: 2, patientId: 1, type: 'X-Ray', date: '2024-01-20', status: 'Active' },
      { id: 3, patientId: 2, type: 'MRI Scan', date: '2024-01-18', status: 'Active' },
      { id: 4, patientId: 3, type: 'Lab Results', date: '2024-01-22', status: 'Active' }
    ];

    fs.writeFileSync('demo-data/health-records.json', JSON.stringify(healthRecords, null, 2));
    console.log('✅ Created demo health records');

    // Create demo consents
    const consents = [
      { id: 1, patientId: 1, providerId: 1, status: 'Approved', dataType: 'Blood Test' },
      { id: 2, patientId: 2, providerId: 1, status: 'Pending', dataType: 'MRI Scan' },
      { id: 3, patientId: 3, providerId: 2, status: 'Approved', dataType: 'Lab Results' }
    ];

    fs.writeFileSync('demo-data/consents.json', JSON.stringify(consents, null, 2));
    console.log('✅ Created demo consent data');

    console.log('\n🎉 Hackathon setup completed successfully!');
    console.log('\n📋 Demo Preparation Checklist:');
    console.log('✅ Environment configured for hackathon');
    console.log('✅ Demo data created');
    console.log('✅ All features enabled');
    console.log('✅ Performance optimized');
    
    console.log('\n🚀 Next Steps:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Open http://localhost:3000 in your browser');
    console.log('3. Configure MetaMask with Base Sepolia network');
    console.log('4. Get test ETH from Base Sepolia faucet');
    console.log('5. Follow the HACKATHON_DEMO_GUIDE.md for demo script');
    
    console.log('\n📖 Demo Resources:');
    console.log('- HACKATHON_DEMO_GUIDE.md - Complete demo script');
    console.log('- QUICK_START.md - Quick setup instructions');
    console.log('- SETUP_GUIDE.md - Full production setup');
    
    console.log('\n🏆 Ready to win the hackathon! 🚀');

  } catch (error) {
    console.error('❌ Hackathon setup failed:', error.message);
  }
}

// Run hackathon setup
hackathonSetup();
