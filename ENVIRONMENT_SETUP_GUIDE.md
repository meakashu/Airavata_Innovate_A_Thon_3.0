# 🔧 Environment Setup Guide

## 🚨 **CRITICAL: Missing Environment Variables Detected**

Based on the database and storage test results, several critical environment variables are missing. Follow this guide to fix them.

---

## 📋 **Required Environment Variables**

### **1. Create .env.local File**

Create a `.env.local` file in your project root with the following content:

```bash
# =============================================================================
# TrustBridge Protocol - Environment Configuration
# =============================================================================

# =============================================================================
# APPLICATION CONFIGURATION
# =============================================================================
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=TrustBridge Protocol
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000

# =============================================================================
# BLOCKCHAIN CONFIGURATION (Base Sepolia Testnet)
# =============================================================================
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_RPC_URL=https://sepolia.base.org
NEXT_PUBLIC_EXPLORER_URL=https://sepolia.basescan.org

# =============================================================================
# SMART CONTRACT ADDRESSES (Update after deployment)
# =============================================================================
NEXT_PUBLIC_USDC_CONTRACT_ADDRESS=0x036CbD53842c5426634e7929541eC2318f3dCF7c
NEXT_PUBLIC_USER_REGISTRY_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_CONSENT_MANAGEMENT_ADDRESS=0x2345678901234567890123456789012345678901
NEXT_PUBLIC_HEALTH_RECORD_UPLOAD_ADDRESS=0x3456789012345678901234567890123456789012
NEXT_PUBLIC_PAYMENT_SETTLEMENT_ADDRESS=0x4567890123456789012345678901234567890123
NEXT_PUBLIC_EMERGENCY_ACCESS_ADDRESS=0x5678901234567890123456789012345678901234
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x6789012345678901234567890123456789012345
NEXT_PUBLIC_TBGT_TOKEN_ADDRESS=0x7890123456789012345678901234567890123456
NEXT_PUBLIC_SUBSCRIPTION_MANAGEMENT_ADDRESS=0x8901234567890123456789012345678901234567

# =============================================================================
# STORAGE CONFIGURATION
# =============================================================================
# Lighthouse Storage API Key (CRITICAL - Get from https://files.lighthouse.storage/dashboard/apikey)
NEXT_PUBLIC_LIGHTHOUSE_API_KEY=6ac6f362.c88c269d35b84e3884dd62cea1386629
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.lighthouse.storage/ipfs/
NEXT_PUBLIC_IPFS_HOST=gateway.lighthouse.storage
NEXT_PUBLIC_IPFS_AUTH=your_lighthouse_auth_token

# =============================================================================
# CERAMIC NETWORK
# =============================================================================
NEXT_PUBLIC_CERAMIC_NODE=https://ceramic-clay.3boxlabs.com
NEXT_PUBLIC_CERAMIC_URL=https://ceramic-clay.3boxlabs.com

# =============================================================================
# WALLET & PAYMENT CONFIGURATION
# =============================================================================
# Coinbase API Key (CRITICAL - Get from https://www.coinbase.com/settings/api)
NEXT_PUBLIC_COINBASE_API_KEY=9227fd6a-cd18-4ecc-b1b3-903f9a6c2fd6
COINBASE_API_KEY=9227fd6a-cd18-4ecc-b1b3-903f9a6c2fd6

# Coinbase Payment Gateway Configuration
NEXT_PUBLIC_USE_DEVELOPER_CREDIT=true
NEXT_PUBLIC_PAYMENT_MODE=developer_credit

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
# SECURITY CONFIGURATION
# =============================================================================
JWT_SECRET=your_super_secure_jwt_secret_key_here_change_this_in_production
SESSION_SECRET=your_session_secret_key_here_change_this_in_production
ENCRYPTION_KEY=your_32_character_encryption_key_here_change_this_in_production

# =============================================================================
# HARDHAT CONFIGURATION
# =============================================================================
BASESCAN_API_KEY=MXZM5XJ2FFMTFMCYSZH959Q689NB5XFMSC
COINMARKETCAP_API_KEY=30eb51ad-105a-4fae-8bc9-410fc4d78844
REPORT_GAS=true
```

---

## 🔑 **API Keys Setup**

### **1. Lighthouse Storage API Key**

**Status**: ❌ **MISSING** - This is critical for file storage

**Steps to get API key:**
1. Visit [Lighthouse Storage Dashboard](https://files.lighthouse.storage/dashboard/apikey)
2. Create an account or sign in
3. Generate a new API key
4. Copy the API key and add it to `.env.local`

**Current Value**: `6ac6f362.c88c269d35b84e3884dd62cea1386629`

### **2. Coinbase API Key**

**Status**: ❌ **MISSING** - This is critical for payments

**Steps to get API key:**
1. Visit [Coinbase API Settings](https://www.coinbase.com/settings/api)
2. Create a new API key
3. Enable the following permissions:
   - View permissions
   - Transfer permissions (for payments)
4. Copy the API key and add it to `.env.local`

**Current Value**: `9227fd6a-cd18-4ecc-b1b3-903f9a6c2fd6`

---

## 🚀 **Quick Fix Commands**

### **1. Create .env.local File**

```bash
# Copy the environment configuration above to .env.local
cp env.example .env.local
```

### **2. Update Critical API Keys**

```bash
# Update Lighthouse API Key
echo "NEXT_PUBLIC_LIGHTHOUSE_API_KEY=6ac6f362.c88c269d35b84e3884dd62cea1386629" >> .env.local

# Update Coinbase API Key
echo "NEXT_PUBLIC_COINBASE_API_KEY=9227fd6a-cd18-4ecc-b1b3-903f9a6c2fd6" >> .env.local
echo "COINBASE_API_KEY=9227fd6a-cd18-4ecc-b1b3-903f9a6c2fd6" >> .env.local
```

### **3. Enable Developer Credit Mode**

```bash
# Enable developer credit for testing
echo "NEXT_PUBLIC_USE_DEVELOPER_CREDIT=true" >> .env.local
echo "NEXT_PUBLIC_PAYMENT_MODE=developer_credit" >> .env.local
```

---

## 🔍 **Test Results Analysis**

### **✅ Working Components:**
- Blockchain Configuration (Base Sepolia)
- Smart Contract Addresses (8/9 configured)
- Feature Flags (All enabled)
- Security Configuration (Basic setup complete)

### **❌ Critical Issues:**
1. **Lighthouse API Key Missing** - File storage won't work
2. **Coinbase API Key Missing** - Payments won't work
3. **Ceramic Node Connection** - May be offline (not critical for basic functionality)

### **⚠️ Warnings:**
1. **USDC Contract Address** - Not configured (optional for testing)
2. **Development Server** - Not running (start with `npm run dev`)

---

## 🎯 **Next Steps**

### **1. Immediate Actions:**
1. Create `.env.local` file with the configuration above
2. Get Lighthouse API key from the dashboard
3. Get Coinbase API key from Coinbase settings
4. Update the `.env.local` file with real API keys

### **2. Test the Configuration:**
```bash
# Run the database and storage test
node scripts/test-database-storage.js

# Start the development server
npm run dev

# Test transaction functionality
node scripts/test-transactions.js
```

### **3. Verify Everything Works:**
1. Visit `http://localhost:3000/transaction-testing`
2. Test file uploads
3. Test payment processing
4. Verify blockchain interactions

---

## 🔒 **Security Notes**

### **Important Security Considerations:**
1. **Never commit `.env.local` to version control**
2. **Use different API keys for development and production**
3. **Rotate API keys regularly**
4. **Enable 2FA on all accounts**
5. **Monitor API usage for suspicious activity**

### **Production Deployment:**
1. Use production API keys
2. Set `NODE_ENV=production`
3. Disable debug mode
4. Use real smart contract addresses
5. Configure proper security secrets

---

## 📞 **Support**

If you encounter issues:
1. Check the test results: `node scripts/test-database-storage.js`
2. Verify API keys are correct
3. Ensure all environment variables are set
4. Check network connectivity
5. Review the error logs

**Result**: Once you follow this guide, your database and storage configuration will be fully functional!
