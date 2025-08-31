# Coinbase Developer Platform Setup Guide

## 🎯 **Overview**

This guide helps you set up Coinbase's $100 developer platform credit to test real-time transactions in HealthHash. This allows you to validate the x402 protocol and payment system without using real funds.

---

## 🚀 **Quick Setup (5 Minutes)**

### **1. Create Coinbase Developer Account**

1. **Visit Coinbase Developer Portal**
   ```
   https://developers.coinbase.com/
   ```

2. **Sign Up/Login**
   - Use your existing Coinbase account or create a new one
   - Complete KYC verification if required

3. **Access Developer Platform**
   - Navigate to "Developer Platform"
   - Accept terms and conditions

### **2. Get $100 Developer Credit**

1. **Request Developer Credit**
   - Click "Get Developer Credit"
   - Fill out the application form
   - Specify use case: "Healthcare data platform testing"

2. **Credit Activation**
   - Credit is typically activated within 24-48 hours
   - You'll receive email confirmation

### **3. Generate API Credentials**

1. **Create New App**
   ```
   Dashboard → Apps → Create New App
   ```

2. **Configure App Settings**
   - **App Name**: `HealthHash Testing`
   - **Description**: `Healthcare data platform transaction testing`
   - **Permissions**: 
     - ✅ Read accounts
     - ✅ Read transactions
     - ✅ Create charges
     - ✅ Send transfers

3. **Get API Keys**
   - **API Key**: Copy the generated API key
   - **API Secret**: Copy the API secret
   - **Passphrase**: Create a secure passphrase

### **4. Configure Environment**

1. **Update .env.local**
   ```env
   # Coinbase API Credentials
   COINBASE_API_SECRET=your_api_secret_here
   COINBASE_PASSPHRASE=your_passphrase_here
   COINBASE_SANDBOX_MODE=true
   COINBASE_DEVELOPER_CREDIT=100
   ```

2. **Test Configuration**
   ```bash
   npm run test:coinbase
   ```

---

## 🧪 **Testing Features**

### **Real-time Transaction Testing**

1. **Access Testing Page**
   ```
   http://localhost:3000/transaction-testing
   ```

2. **Test Transaction Flow**
   - Connect Coinbase Wallet
   - Verify USDC balance
   - Run test transaction (0.01-1.00 USDC)
   - Monitor transaction status
   - View transaction history

### **Available Test Features**

#### **✅ Coinbase Integration**
- Real USDC transactions on Base Network
- Transaction monitoring and analytics
- Real-time status updates
- Comprehensive error handling

#### **✅ x402 Protocol Testing**
- Payment initiation and processing
- Gas estimation and optimization
- Transaction confirmation tracking
- Error recovery mechanisms

#### **✅ Analytics Dashboard**
- Transaction success rates
- Average transaction amounts
- Network performance metrics
- Developer credit usage tracking

---

## 📊 **Transaction Testing Workflow**

### **Step 1: Verify Setup**
```bash
# Check Coinbase integration
npm run test:coinbase

# Verify API credentials
npm run verify:credentials
```

### **Step 2: Run Test Transaction**
1. **Navigate to Testing Page**
   ```
   /transaction-testing
   ```

2. **Configure Test Parameters**
   - Amount: 0.01 USDC (recommended)
   - Description: "HealthHash Test Transaction"
   - Network: Base Network

3. **Execute Transaction**
   - Click "Run Test Transaction"
   - Monitor real-time status
   - Verify completion

### **Step 3: Validate Results**
1. **Check Transaction Status**
   - Pending → Processing → Completed
   - Verify on Base Network explorer

2. **Review Analytics**
   - Success rate metrics
   - Transaction history
   - Developer credit balance

3. **Test Error Scenarios**
   - Invalid amounts
   - Network failures
   - Insufficient balance

---

## 🔧 **Configuration Options**

### **Environment Variables**

```env
# Required for Coinbase Integration
COINBASE_API_SECRET=your_api_secret
COINBASE_PASSPHRASE=your_passphrase
COINBASE_SANDBOX_MODE=true

# Optional Configuration
COINBASE_DEVELOPER_CREDIT=100
COINBASE_TEST_AMOUNT=0.01
COINBASE_MONITORING_INTERVAL=5000
```

### **Testing Parameters**

```typescript
// Default test configuration
const TEST_CONFIG = {
  defaultAmount: '0.01',           // Default test amount
  maxAmount: '1.00',              // Maximum test amount
  monitoringInterval: 5000,        // Refresh interval (ms)
  maxRetries: 3,                  // Maximum retry attempts
  timeout: 30000,                 // Transaction timeout (ms)
};
```

---

## 📈 **Monitoring & Analytics**

### **Real-time Monitoring**

1. **Transaction Status**
   - Pending transactions
   - Processing transactions
   - Completed transactions
   - Failed transactions

2. **Balance Tracking**
   - Current USDC balance
   - Developer credit usage
   - Transaction history

3. **Performance Metrics**
   - Success rates
   - Average transaction time
   - Gas usage optimization
   - Network performance

### **Analytics Dashboard**

```typescript
// Analytics data structure
interface TransactionAnalytics {
  totalTransactions: number;
  completedTransactions: number;
  pendingTransactions: number;
  failedTransactions: number;
  totalAmount: string;
  successRate: string;
  averageAmount: string;
  developerCreditUsed: string;
  developerCreditRemaining: string;
}
```

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. API Authentication Failed**
```bash
# Check API credentials
npm run verify:credentials

# Regenerate API keys if needed
# Dashboard → Apps → Regenerate Keys
```

#### **2. Insufficient Developer Credit**
```bash
# Check current balance
npm run check:balance

# Request additional credit
# Contact Coinbase Developer Support
```

#### **3. Transaction Failed**
```bash
# Check network status
npm run check:network

# Verify Base Network connectivity
npm run test:base-network
```

#### **4. Wallet Connection Issues**
```bash
# Reset wallet connection
npm run reset:wallet

# Clear browser cache
npm run clear:cache
```

### **Error Codes**

| Error Code | Description | Solution |
|------------|-------------|----------|
| `AUTH_FAILED` | API authentication failed | Check API credentials |
| `INSUFFICIENT_FUNDS` | Not enough developer credit | Request additional credit |
| `NETWORK_ERROR` | Base Network connectivity issue | Check network status |
| `INVALID_AMOUNT` | Transaction amount too high/low | Use 0.01-1.00 USDC |
| `TIMEOUT` | Transaction timeout | Retry with higher gas |

---

## 🔒 **Security Best Practices**

### **API Key Management**

1. **Secure Storage**
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys regularly

2. **Access Control**
   - Limit API permissions to minimum required
   - Use sandbox mode for testing
   - Monitor API usage

3. **Error Handling**
   - Don't expose sensitive data in error messages
   - Log errors securely
   - Implement rate limiting

### **Testing Security**

```typescript
// Security checklist
const SECURITY_CHECKLIST = {
  apiKeysSecured: true,           // API keys in environment variables
  sandboxMode: true,              // Using sandbox for testing
  errorHandling: true,            // Proper error handling
  rateLimiting: true,             // Rate limiting implemented
  logging: true,                  // Secure logging
  monitoring: true,               // Activity monitoring
};
```

---

## 📞 **Support & Resources**

### **Coinbase Developer Resources**

- **Documentation**: https://developers.coinbase.com/
- **API Reference**: https://developers.coinbase.com/api/v2
- **Support**: https://support.coinbase.com/
- **Community**: https://community.coinbase.com/

### **HealthHash Integration Support**

- **Transaction Testing**: `/transaction-testing`
- **API Documentation**: `/api/docs`
- **Error Logs**: `/logs`
- **Status Page**: `/status`

### **Getting Help**

1. **Check Documentation**
   - Review this guide
   - Check Coinbase developer docs
   - Review error logs

2. **Community Support**
   - GitHub Issues
   - Discord Community
   - Stack Overflow

3. **Direct Support**
   - Coinbase Developer Support
   - HealthHash Support Team

---

## 🎯 **Next Steps**

### **After Setup**

1. **Run Initial Tests**
   ```bash
   npm run test:all
   ```

2. **Validate Integration**
   - Test small transactions
   - Monitor performance
   - Verify analytics

3. **Scale Testing**
   - Increase transaction volumes
   - Test error scenarios
   - Optimize performance

### **Production Deployment**

1. **Switch to Production**
   - Update API credentials
   - Disable sandbox mode
   - Configure monitoring

2. **Security Review**
   - Audit API usage
   - Review security measures
   - Implement monitoring

3. **Go Live**
   - Deploy to production
   - Monitor transactions
   - Track performance

---

## ✅ **Success Checklist**

- [ ] Coinbase developer account created
- [ ] $100 developer credit received
- [ ] API credentials generated
- [ ] Environment configured
- [ ] Integration tested
- [ ] Transaction testing working
- [ ] Analytics dashboard functional
- [ ] Error handling implemented
- [ ] Security measures in place
- [ ] Documentation complete

**Status**: 🟢 **Ready for Transaction Testing**
