# Ceramic Node Setup Guide for TrustBridge Protocol

## 🎯 **Overview**

This guide will help you set up and run a Ceramic node for the TrustBridge Protocol's fully decentralized architecture. The Ceramic node will handle user profiles, settings, and other decentralized data storage.

## 🚀 **Quick Start**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Start Ceramic Node (Development)**
```bash
npm run ceramic:dev
```

### **3. Start Ceramic Node (Production)**
```bash
npm run ceramic:prod
```

## 📋 **Prerequisites**

- **Node.js** 18+ 
- **npm** 9+
- **Docker** (for production deployment)
- **Docker Compose** (for production deployment)

## 🛠️ **Local Development Setup**

### **1. Configuration**

The Ceramic node is configured via `ceramic.config.json`:

```json
{
  "ceramic": {
    "network": "testnet-clay",
    "port": 7007,
    "gatewayHostname": "0.0.0.0",
    "corsAllowedOrigins": [
      "http://localhost:3000"
    ]
  }
}
```

### **2. Environment Variables**

Create a `.env.local` file:

```bash
# Ceramic Configuration
CERAMIC_NETWORK=testnet-clay
CERAMIC_PORT=7007
CERAMIC_HOST=0.0.0.0
CERAMIC_DATA_DIR=./ceramic-data
CERAMIC_CONFIG=./ceramic.config.json

# For production
NODE_ENV=production
```

### **3. Start the Node**

```bash
# Development mode
npm run ceramic:dev

# Or directly
node scripts/start-ceramic.js
```

### **4. Verify Node Status**

```bash
npm run ceramic:status
```

## 🐳 **Production Deployment with Docker**

### **1. Build and Run with Docker Compose**

```bash
# Start all services
docker-compose -f docker-compose.ceramic.yml up -d

# View logs
docker-compose -f docker-compose.ceramic.yml logs -f ceramic-node

# Stop services
docker-compose -f docker-compose.ceramic.yml down
```

### **2. Manual Docker Build**

```bash
# Build the image
docker build -f docker/ceramic/Dockerfile -t trustbridge-ceramic .

# Run the container
docker run -d \
  --name trustbridge-ceramic \
  -p 7007:7007 \
  -p 9090:9090 \
  -v ceramic-data:/app/ceramic-data \
  trustbridge-ceramic
```

## 🔧 **Configuration Options**

### **Network Options**

- **`testnet-clay`** - Test network (recommended for development)
- **`mainnet`** - Production network
- **`local`** - Local development network

### **Port Configuration**

- **7007** - Ceramic API (default)
- **9090** - Metrics endpoint

### **Data Storage**

- **Local Filesystem** - `./ceramic-data` (development)
- **Docker Volume** - `ceramic-data` (production)

## 📊 **Monitoring & Metrics**

### **1. Health Check**

```bash
curl http://localhost:7007/api/v0/node/health
```

### **2. Metrics Endpoint**

```bash
curl http://localhost:9090/metrics
```

### **3. Node Status**

```bash
npm run ceramic:status
```

### **4. Grafana Dashboard** (with Docker Compose)

Access Grafana at `http://localhost:3001`
- Username: `admin`
- Password: `admin`

## 🔒 **Security Considerations**

### **1. CORS Configuration**

Update `ceramic.config.json` with your domain:

```json
{
  "ceramic": {
    "corsAllowedOrigins": [
      "http://localhost:3000",
      "https://your-production-domain.com"
    ]
  }
}
```

### **2. Admin DIDs**

Configure admin DIDs for node management:

```json
{
  "ceramic": {
    "adminDids": [
      "did:key:your-admin-did-here"
    ]
  }
}
```

### **3. Network Security**

For production deployment:

- Use HTTPS/TLS
- Configure firewall rules
- Use reverse proxy (nginx)
- Enable authentication

## 🔄 **Integration with TrustBridge Protocol**

### **1. Update Environment Variables**

In your `.env.local`:

```bash
# Ceramic Node URL
NEXT_PUBLIC_CERAMIC_NODE=http://localhost:7007

# For production
NEXT_PUBLIC_CERAMIC_NODE=https://your-ceramic-node.com
```

### **2. Initialize in Your Application**

```typescript
import { decentralizedStorageService } from '../services/decentralized-storage';

// Initialize with user's private key
await decentralizedStorageService.initialize(userPrivateKey);

// Create user profile
const profile = await decentralizedStorageService.createUserProfile({
  walletAddress: '0x1234...',
  did: 'did:ethr:0x1234...',
  role: 'patient',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  // ... other fields
});
```

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Port Already in Use**
```bash
# Check what's using port 7007
netstat -tulpn | grep 7007

# Kill the process or change port
lsof -ti:7007 | xargs kill -9
```

#### **2. Permission Denied**
```bash
# Fix permissions for data directory
chmod 755 ./ceramic-data
```

#### **3. Network Connection Issues**
```bash
# Check if node is running
curl http://localhost:7007/api/v0/node/health

# Check logs
docker-compose -f docker-compose.ceramic.yml logs ceramic-node
```

#### **4. Data Directory Issues**
```bash
# Create data directory
mkdir -p ./ceramic-data

# Set proper permissions
chmod 755 ./ceramic-data
```

### **Log Analysis**

```bash
# View real-time logs
docker-compose -f docker-compose.ceramic.yml logs -f ceramic-node

# View specific log levels
docker-compose -f docker-compose.ceramic.yml logs ceramic-node | grep ERROR
```

## 📈 **Performance Optimization**

### **1. Resource Limits**

For Docker deployment, add resource limits:

```yaml
services:
  ceramic-node:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
```

### **2. Caching Configuration**

```json
{
  "ceramic": {
    "streamCacheLimit": 1000,
    "validateStreams": true
  }
}
```

### **3. Database Optimization**

```json
{
  "ceramic": {
    "indexing": {
      "db": "sqlite",
      "allowQueriesBeforeHistoricalSync": true
    }
  }
}
```

## 🔄 **Backup & Recovery**

### **1. Data Backup**

```bash
# Backup Ceramic data
tar -czf ceramic-backup-$(date +%Y%m%d).tar.gz ./ceramic-data

# For Docker
docker run --rm -v ceramic-data:/data -v $(pwd):/backup alpine tar czf /backup/ceramic-backup-$(date +%Y%m%d).tar.gz -C /data .
```

### **2. Data Recovery**

```bash
# Restore from backup
tar -xzf ceramic-backup-20231201.tar.gz

# For Docker
docker run --rm -v ceramic-data:/data -v $(pwd):/backup alpine tar xzf /backup/ceramic-backup-20231201.tar.gz -C /data
```

## 🎯 **Next Steps**

1. **Test the node** - Verify it's working correctly
2. **Configure monitoring** - Set up alerts and dashboards
3. **Deploy to production** - Use Docker Compose or cloud deployment
4. **Integrate with your app** - Update your application to use the Ceramic node
5. **Set up backup strategy** - Configure automated backups
6. **Monitor performance** - Track metrics and optimize

## 📚 **Resources**

- [Ceramic Documentation](https://developers.ceramic.network/)
- [Ceramic CLI Reference](https://developers.ceramic.network/reference/cli/)
- [Ceramic Network Status](https://status.ceramic.network/)
- [Docker Documentation](https://docs.docker.com/)

---

**Your Ceramic node is now ready for the TrustBridge Protocol!** 🚀

The node will handle all user profiles, settings, and decentralized data storage, making your application truly decentralized without any centralized databases.
