#!/usr/bin/env node

const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 TrustBridge Protocol - Environment Setup\n');

// Generate security keys
const jwtSecret = crypto.randomBytes(64).toString('hex');
const sessionSecret = crypto.randomBytes(32).toString('hex');
const encryptionKey = crypto.randomBytes(16).toString('hex');

// Template for .env.local
const envTemplate = `# =============================================================================
# TrustBridge Protocol - Environment Configuration
# =============================================================================
# Generated on: ${new Date().toISOString()}
# =============================================================================

# =============================================================================
# APPLICATION CONFIGURATION
# =============================================================================
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=TrustBridge Protocol
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000

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
NEXT_PUBLIC_IPFS_GATEWAY=http://127.0.0.1:8080
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
NEXT_PUBLIC_MOCK_DATA_ENABLED=true
NEXT_PUBLIC_DEBUG_MODE=true

# =============================================================================
# DEVELOPMENT & DEBUGGING
# =============================================================================
NEXT_PUBLIC_LOG_LEVEL=debug
NEXT_PUBLIC_THEME_PREFERENCE=auto

# =============================================================================
# SECURITY & AUTHENTICATION
# =============================================================================
# JWT and Session Management
JWT_SECRET=${jwtSecret}
SESSION_SECRET=${sessionSecret}
ENCRYPTION_KEY=${encryptionKey}

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
# EDGE FUNCTIONS CONFIGURATION
# =============================================================================
# Edge Function Private Key (for emergency access)
EDGE_FUNCTION_PRIVATE_KEY=your_edge_function_private_key_here

# Emergency Access Contract (for edge functions)
EMERGENCY_ACCESS_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# =============================================================================
# GRAPH CONFIGURATION
# =============================================================================
# Graph Access Token (for subgraph deployment)
GRAPH_ACCESS_TOKEN=your_graph_access_token_here

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

# =============================================================================
# SECURITY NOTES
# =============================================================================
# 1. Never commit this file to version control
# 2. Use different keys for development and production
# 3. Rotate keys regularly
# 4. Use strong, unique passwords for all services
# 5. Enable 2FA on all accounts
# 6. Monitor for suspicious activity
# =============================================================================
`;

// Function to ask for user input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupEnvironment() {
  try {
    console.log('📝 Setting up environment configuration...\n');

    // Check if .env.local already exists
    if (fs.existsSync('.env.local')) {
      const overwrite = await askQuestion('⚠️  .env.local already exists. Overwrite? (y/N): ');
      if (overwrite.toLowerCase() !== 'y') {
        console.log('❌ Setup cancelled.');
        rl.close();
        return;
      }
    }

    // Write the environment file
    fs.writeFileSync('.env.local', envTemplate);
    console.log('✅ Created .env.local file');

    // Generate VAPID keys
    console.log('\n🔑 Generating VAPID keys for push notifications...');
    const { execSync } = require('child_process');
    try {
      const vapidKeys = execSync('npx web-push generate-vapid-keys', { encoding: 'utf8' });
      console.log('✅ VAPID keys generated:');
      console.log(vapidKeys);
      
      // Save VAPID keys to a separate file
      fs.writeFileSync('vapid-keys.txt', vapidKeys);
      console.log('✅ VAPID keys saved to vapid-keys.txt');
    } catch (error) {
      console.log('⚠️  Could not generate VAPID keys automatically. Please run:');
      console.log('   npx web-push generate-vapid-keys');
    }

    console.log('\n🎉 Environment setup completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Update .env.local with your actual API keys');
    console.log('2. Add Base Network to MetaMask');
    console.log('3. Deploy smart contracts');
    console.log('4. Run: npm install && npm run dev');
    console.log('\n📖 See SETUP_GUIDE.md for detailed instructions');

  } catch (error) {
    console.error('❌ Error during setup:', error.message);
  } finally {
    rl.close();
  }
}

// Run the setup
setupEnvironment();
