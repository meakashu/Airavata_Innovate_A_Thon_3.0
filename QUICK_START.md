# HealthHash - Ultra Fast Deploy Guide

## ⚡ **DEPLOY IN 3 MINUTES**

### **One Command Deploy**
```bash
git clone https://github.com/your-org/healthhash.git && cd healthhash
npm run deploy:fast
```

### **Step by Step (3 minutes)**
```bash
# 1. Install & Setup (30 seconds)
npm install
npm run setup:fast

# 2. Deploy Contracts (1 minute)
npm run deploy:contracts

# 3. Update Addresses (30 seconds)
npm run update:addresses

# 4. Start App (30 seconds)
npm run dev
```

**🎯 DONE! Your healthcare platform is running at http://localhost:3000**

---

## 🎯 **CORE FEATURES**

### **🔐 Decentralized Storage**
- **IPFS Storage**: Files stored on IPFS (Pinata + Lighthouse)
- **Simple Database**: IPFS + Smart Contract Events (no MongoDB!)
- **Patient Data**: Encrypted health records on IPFS

### **💰 x402 Protocol**
- **Instant Payments**: x402 micropayments for data access
- **Revenue Sharing**: 50/50 split patients/protocol
- **USDC Payments**: Real transactions on Base Network

### **👛 Coinbase Wallet**
- **Primary Wallet**: Coinbase Wallet support
- **Easy Connect**: One-click wallet connection
- **Base Network**: Automatic network switching

---

## 🛠️ **SIMPLE TECH STACK**

- **Frontend**: Next.js 14 + Chakra UI
- **Blockchain**: Base Network (Ethereum L2)
- **Storage**: IPFS (Pinata + Lighthouse)
- **Database**: IPFS + Smart Contracts (decentralized)
- **Wallet**: Coinbase Wallet
- **Payments**: x402 Protocol + USDC

---

## 🔧 **CONFIGURATION**

### **Auto-Configured Environment**
```env
# Base Network
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org

# IPFS Storage
NEXT_PUBLIC_PINATA_API_KEY=c27f5f30ad81d017613e
NEXT_PUBLIC_LIGHTHOUSE_API_KEY=6ac6f362.c88c269d35b84e3884dd62cea1386629

# Coinbase Wallet
NEXT_PUBLIC_COINBASE_API_KEY=9227fd6a-cd18-4ecc-b1b3-903f9a6c2fd6

# USDC
NEXT_PUBLIC_USDC_CONTRACT_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

### **Simple Database**
```typescript
// Decentralized database using IPFS + Smart Contracts
interface HealthRecord {
  id: string;
  patientAddress: string;
  ipfsHash: string;        // Stored on IPFS
  metadata: string;        // Stored in smart contract
  timestamp: number;
  accessControl: string[]; // Stored in smart contract
}
```

---

## 🚀 **DEPLOYMENT COMMANDS**

### **Ultra Fast Deploy**
```bash
npm run deploy:fast
```

### **Production Deploy**
```bash
npm run build
npm run deploy:production
```

### **Testing**
```bash
npm run test:all
```

---

## 🧪 **TEST FEATURES**

1. **Connect Wallet**: Click "Connect Coinbase Wallet"
2. **Upload File**: Test IPFS storage
3. **Make Payment**: Test x402 protocol
4. **View Records**: Test decentralized database

---

## 🆘 **TROUBLESHOOTING**

### **Quick Fixes**
```bash
# Reset everything
npm run reset

# Clear cache
npm run clear:cache

# Rebuild contracts
npm run rebuild:contracts

# Restart app
npm run restart
```

### **Common Issues**
1. **Wallet Not Connecting**: Check Coinbase Wallet extension
2. **Network Issues**: Switch to Base Network
3. **File Upload Failed**: Check Pinata API key
4. **Payment Failed**: Check x402 contract address

---

## 📊 **MONITORING**

```bash
# Check status
npm run status

# View logs
npm run logs

# Monitor transactions
npm run monitor:tx
```

---

## 🎯 **SIMPLE INTEGRATIONS**

### **IPFS Storage**
```typescript
const uploadToIPFS = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${PINATA_API_KEY}` },
    body: formData
  });
  
  return response.json();
};
```

### **x402 Protocol**
```typescript
const makePayment = async (amount: string, recipient: string) => {
  const contract = new ethers.Contract(X402_ADDRESS, X402_ABI, signer);
  return await contract.sendPayment(recipient, amount);
};
```

### **Decentralized Database**
```typescript
const storeHealthRecord = async (data: any) => {
  // 1. Upload to IPFS
  const ipfsHash = await uploadToIPFS(data);
  
  // 2. Store metadata in smart contract
  const contract = new ethers.Contract(HEALTH_CONTRACT, ABI, signer);
  return await contract.storeRecord(ipfsHash, metadata);
};
```

---

## 🚀 **READY TO DEPLOY!**

**Simple. Fast. Decentralized. Production-Ready.**

- ✅ **3-minute deployment**
- ✅ **All features working**
- ✅ **Decentralized storage**
- ✅ **x402 payments**
- ✅ **Coinbase wallet**
- ✅ **No centralized database**

**Start now: `npm run deploy:fast`**
