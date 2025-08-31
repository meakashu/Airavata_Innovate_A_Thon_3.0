# Lighthouse Storage Integration Guide

## Overview

TrustBridge Protocol now supports **Lighthouse Storage** as a primary decentralized storage provider, with IPFS as a fallback option. This integration provides enhanced reliability, performance, and user control over their health data storage.

## Features

### ✅ **Unified Storage Service**
- **Multi-Provider Support**: Choose between Lighthouse Storage and IPFS
- **Automatic Fallback**: If primary provider fails, automatically switches to fallback
- **Consistent API**: Same interface regardless of storage provider
- **Encryption Support**: Client-side encryption before upload

### ✅ **Lighthouse Storage Benefits**
- **High Performance**: Optimized for healthcare data
- **Reliable**: Enterprise-grade infrastructure
- **Cost-Effective**: Competitive pricing for medical data storage
- **Compliant**: Built with healthcare regulations in mind
- **Global CDN**: Fast access worldwide

### ✅ **Enhanced Upload Component**
- **Real-time Progress**: Visual upload progress tracking
- **Provider Selection**: Choose storage provider per upload
- **Metadata Support**: Rich metadata for healthcare records
- **Error Handling**: Comprehensive error management
- **File Validation**: Built-in file type and size validation

## Setup Instructions

### 1. Get Lighthouse API Key

1. Visit [Lighthouse Storage Dashboard](https://files.lighthouse.storage/dashboard/apikey)
2. Create an account or sign in
3. Generate a new API key
4. Copy the API key for configuration

### 2. Environment Configuration

Add your Lighthouse API key to your `.env.local` file:

```bash
# Lighthouse Storage Configuration
NEXT_PUBLIC_LIGHTHOUSE_API_KEY=your_lighthouse_api_key_here
```

### 3. Storage Configuration

The application automatically configures Lighthouse as the primary storage provider. You can customize this in the storage settings:

```typescript
// Default configuration in src/services/storage.ts
export const defaultStorageConfig: StorageConfig = {
  primaryProvider: 'lighthouse',
  fallbackProvider: 'ipfs',
  lighthouse: {
    apiKey: process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || '',
    baseUrl: 'https://api.lighthouse.storage',
    network: 'mainnet',
  },
  enableEncryption: true,
  maxFileSize: 100 * 1024 * 1024, // 100MB
  retryAttempts: 3,
};
```

## Usage Examples

### Basic File Upload

```typescript
import { storageService } from '../services/storage';

// Upload a single file
const uploadFile = async (file: File) => {
  const result = await storageService.uploadFile(file, 'lighthouse', {
    title: 'Patient Lab Results',
    description: 'Blood test results for patient',
    category: 'Lab Results',
    tags: ['blood', 'test', 'patient'],
    privacy: 'private',
  });

  if (result.success) {
    console.log('File uploaded successfully:', result.cid);
    console.log('Access URL:', result.url);
  }
};
```

### Batch Upload

```typescript
// Upload multiple files
const uploadFiles = async (files: File[]) => {
  const results = await storageService.uploadFiles(files, 'auto');
  
  results.forEach(result => {
    if (result.success) {
      console.log(`${result.name} uploaded to ${result.provider}`);
    }
  });
};
```

### File Retrieval

```typescript
// Download a file
const downloadFile = async (cid: string) => {
  const blob = await storageService.downloadFile(cid);
  if (blob) {
    // Handle the downloaded file
    const url = URL.createObjectURL(blob);
    // Use the URL for display or download
  }
};
```

## Storage Settings Page

Access the storage configuration page at `/storage-settings` to:

- **Configure Providers**: Set primary and fallback storage providers
- **Test Connections**: Verify connectivity to both providers
- **View Statistics**: Monitor storage usage and performance
- **Manage API Keys**: Update Lighthouse and IPFS credentials
- **Set Preferences**: Configure encryption and file size limits

## Supported File Types

### Medical Records
- **Lab Results**: PDF, JSON, XML
- **Medical Images**: JPEG, PNG, DICOM
- **Prescriptions**: PDF, Text
- **Vital Signs**: JSON, CSV
- **Clinical Notes**: Text, PDF
- **Procedures**: PDF, Images
- **Allergies**: JSON, Text
- **Immunizations**: JSON, PDF
- **Family History**: JSON, Text
- **Social History**: JSON, Text

### File Size Limits
- **Lab Results**: 10MB
- **Imaging**: 50MB
- **Prescription**: 5MB
- **Vital Signs**: 2MB
- **Notes**: 5MB
- **Procedure**: 25MB
- **Allergy**: 1MB
- **Immunization**: 2MB
- **Family History**: 2MB
- **Social History**: 2MB

## Security Features

### Encryption
- **Client-Side Encryption**: Files encrypted before upload
- **AES-256-GCM**: Industry-standard encryption algorithm
- **Unique Keys**: Each file gets its own encryption key
- **Secure Storage**: Keys managed securely via user wallets

### Access Control
- **Role-Based Access**: Different permissions for different user roles
- **Consent Management**: Granular consent controls
- **Audit Trails**: Complete access logging
- **Emergency Access**: Time-limited emergency access protocols

## Performance Optimization

### Upload Optimization
- **Parallel Uploads**: Multiple files uploaded simultaneously
- **Progress Tracking**: Real-time upload progress
- **Retry Logic**: Automatic retry on failure
- **Chunked Uploads**: Large files split into chunks

### Download Optimization
- **CDN Integration**: Global content delivery network
- **Caching**: Intelligent caching strategies
- **Compression**: Automatic file compression
- **Streaming**: Large file streaming support

## Monitoring and Analytics

### Storage Metrics
- **Usage Statistics**: Track storage consumption
- **Performance Metrics**: Monitor upload/download speeds
- **Error Rates**: Track and analyze failures
- **Cost Analysis**: Monitor storage costs

### Health Checks
- **Connection Testing**: Regular connectivity tests
- **Service Status**: Monitor provider availability
- **Performance Alerts**: Notify on performance issues
- **Capacity Planning**: Predict storage needs

## Troubleshooting

### Common Issues

#### API Key Issues
```bash
Error: Upload failed: 401 Unauthorized
```
**Solution**: Verify your Lighthouse API key is correct and has proper permissions.

#### File Size Limits
```bash
Error: File size exceeds maximum allowed size
```
**Solution**: Check file size limits and compress files if necessary.

#### Network Issues
```bash
Error: Connection timeout
```
**Solution**: Check internet connectivity and try again. The system will automatically fallback to IPFS.

### Support

For technical support:
1. Check the [Lighthouse Storage Documentation](https://docs.lighthouse.storage/)
2. Review the application logs for detailed error messages
3. Test connections using the storage settings page
4. Contact the development team for assistance

## Migration from IPFS

If you're migrating from IPFS to Lighthouse Storage:

1. **Backup Data**: Ensure all existing files are backed up
2. **Update Configuration**: Set Lighthouse as primary provider
3. **Test Uploads**: Verify new uploads work correctly
4. **Monitor Performance**: Track improvements in upload/download speeds
5. **Gradual Migration**: Consider migrating existing files over time

## Future Enhancements

### Planned Features
- **Advanced Encryption**: Quantum-resistant encryption
- **AI Processing**: Automated file analysis and tagging
- **Compression**: Advanced file compression algorithms
- **Backup Strategies**: Multi-region backup options
- **Compliance Tools**: Enhanced HIPAA/GDPR compliance features

### Integration Roadmap
- **Arweave Integration**: Permanent storage option
- **Filecoin Integration**: Additional decentralized storage
- **Advanced CDN**: Enhanced content delivery
- **Mobile Optimization**: Improved mobile upload experience

---

## Quick Start Checklist

- [ ] Get Lighthouse API key from dashboard
- [ ] Add API key to environment variables
- [ ] Test connection in storage settings
- [ ] Upload a test file
- [ ] Verify file retrieval
- [ ] Configure backup preferences
- [ ] Set up monitoring alerts

For more information, visit the [Lighthouse Storage documentation](https://docs.lighthouse.storage/) or contact the development team.
