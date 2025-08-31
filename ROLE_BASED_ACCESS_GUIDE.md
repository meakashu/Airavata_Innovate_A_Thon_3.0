# 🔐 TrustBridge Protocol - Role-Based Access Guide

## 🎯 **Overview**

TrustBridge Protocol uses a sophisticated role-based access control system that allows different types of users to access specific features and dashboards based on their role in the healthcare ecosystem.

---

## 👥 **Available User Roles**

### **1. Patient** 🏥
- **Description**: Individual patients managing their health data
- **Access**: Personal health records, consent management, earnings
- **Dashboard**: `/dashboard` (Patient view)
- **Key Features**:
  - Upload and manage health records
  - Control data access permissions
  - Earn TBGT tokens for data sharing
  - Emergency access settings
  - View earnings and analytics

### **2. Hospital Provider** 🏨
- **Description**: Healthcare providers and hospitals
- **Access**: Patient management, emergency protocols, compliance
- **Dashboard**: `/hospital-admin-dashboard`
- **Key Features**:
  - Patient search and management
  - Request data access from patients
  - Emergency access protocols
  - Compliance tracking
  - Analytics and insights

### **3. Researcher** 🔬
- **Description**: Medical researchers and academic institutions
- **Access**: Research data, analytics, proposals
- **Dashboard**: `/research`
- **Key Features**:
  - Access anonymized datasets
  - Submit research proposals
  - Advanced analytics tools
  - Data marketplace
  - Research insights

### **4. Pharmaceutical** 💊
- **Description**: Pharmaceutical companies and drug developers
- **Access**: Clinical trial data, drug development insights
- **Dashboard**: `/research` (Pharma view)
- **Key Features**:
  - Clinical trial data access
  - Drug development insights
  - Patient recruitment tools
  - Market analysis
  - Regulatory compliance

### **5. DAO Member** 🏛️
- **Description**: Governance participants and protocol stakeholders
- **Access**: Governance, proposals, treasury
- **Dashboard**: `/governance`
- **Key Features**:
  - Vote on governance proposals
  - Protocol governance
  - Treasury management
  - Community decisions
  - Staking rewards

---

## 🔄 **How to Switch Roles (Demo Mode)**

### **For Hackathon Demo**
Since you're using a single wallet for demo purposes, we've implemented a **Role Switcher** that allows you to switch between different roles to showcase all features.

### **Step-by-Step Role Switching**

1. **Connect Your Wallet**
   - Click "Connect Wallet" on the landing page
   - Approve the connection in MetaMask

2. **Access Role Switcher**
   - Look for the "Switch Role" button in the header
   - It's located next to your wallet address

3. **Select New Role**
   - Click "Switch Role" to open the role selection modal
   - Choose from the 5 available roles
   - Each role shows its features and demo data

4. **Confirm Role Switch**
   - Click "Switch to [Role Name]"
   - The interface will update to show the new role's dashboard

5. **Explore Role-Specific Features**
   - Navigate to different pages to see role-specific content
   - Each role has different navigation items and features

---

## 🎬 **Demo Scenarios by Role**

### **Patient Demo Flow**
1. **Switch to Patient role**
2. **Visit `/dashboard`** - See patient overview
3. **Visit `/records`** - Upload/manage health records
4. **Visit `/consent`** - Manage data access permissions
5. **Visit `/earnings`** - View token earnings
6. **Visit `/emergency`** - Emergency access settings

### **Hospital Provider Demo Flow**
1. **Switch to Hospital Provider role**
2. **Visit `/hospital-admin-dashboard`** - Provider dashboard
3. **Visit `/patients`** - Patient management
4. **Visit `/emergency`** - Emergency protocols
5. **Visit `/compliance`** - Compliance tracking
6. **Visit `/analytics`** - Provider analytics

### **Researcher Demo Flow**
1. **Switch to Researcher role**
2. **Visit `/research`** - Research dashboard
3. **Browse datasets** - Available research data
4. **Submit proposals** - Research requests
5. **View analytics** - Research insights
6. **Check earnings** - Research compensation

### **Pharmaceutical Demo Flow**
1. **Switch to Pharmaceutical role**
2. **Visit `/research`** - Pharma dashboard
3. **Access clinical data** - Trial information
4. **Drug development** - Development insights
5. **Patient recruitment** - Recruitment tools
6. **Market analysis** - Industry insights

### **DAO Member Demo Flow**
1. **Switch to DAO Member role**
2. **Visit `/governance`** - Governance dashboard
3. **View proposals** - Active proposals
4. **Vote on decisions** - Governance voting
5. **Check treasury** - Treasury management
6. **View staking** - Staking rewards

---

## 🛠️ **Technical Implementation**

### **Role-Based Navigation**
The navigation menu automatically updates based on your current role:

```typescript
const roleBasedNavigation = {
  [UserRole.Patient]: [
    { name: 'My Records', href: '/records' },
    { name: 'Consent Management', href: '/consent' },
    { name: 'Earnings', href: '/earnings' },
    { name: 'Emergency Access', href: '/emergency' },
  ],
  [UserRole.HospitalProvider]: [
    { name: 'Patient Search', href: '/patients' },
    { name: 'Record Upload', href: '/upload' },
    { name: 'Emergency Access', href: '/emergency' },
    { name: 'Compliance', href: '/compliance' },
  ],
  // ... other roles
};
```

### **Access Control**
Each page checks the user's role before allowing access:

```typescript
// Example: Research page access control
useEffect(() => {
  if (userRole && !['Researcher', 'Pharmaceutical'].includes(userRole)) {
    addNotification({
      type: 'error',
      title: 'Access Denied',
      message: 'This dashboard is only available for researchers and pharmaceutical companies.',
      priority: 'high',
    });
  }
}, [userRole, addNotification]);
```

### **Demo Data**
Each role has specific demo data that populates the interface:

```typescript
const demoData = {
  Patient: {
    name: 'Alice Johnson',
    records: 5,
    earnings: 1250,
    consents: 3
  },
  HospitalProvider: {
    name: 'Dr. Sarah Wilson',
    patients: 45,
    requests: 12,
    emergency: 2
  },
  // ... other roles
};
```

---

## 🔒 **Security & Permissions**

### **Role-Based Permissions**
- **Patient**: Can only access their own data
- **Provider**: Can request access to patient data
- **Researcher**: Can access anonymized datasets
- **Pharmaceutical**: Can access clinical trial data
- **DAO**: Can participate in governance

### **Data Access Control**
- All data access is logged on the blockchain
- Patients must approve data access requests
- Emergency access has special protocols
- All actions are auditable

---

## 🎯 **Hackathon Demo Tips**

### **Quick Demo Sequence**
1. **Start as Patient** - Show data ownership
2. **Switch to Provider** - Show healthcare workflows
3. **Switch to Researcher** - Show research capabilities
4. **Switch to Pharmaceutical** - Show industry features
5. **Switch to DAO** - Show governance features

### **Key Talking Points**
- **"Single wallet, multiple roles"** - Demonstrate role switching
- **"Role-specific dashboards"** - Show different interfaces
- **"Access control"** - Explain security features
- **"Real-world use cases"** - Connect to healthcare scenarios

### **Demo Script**
```
"Now let me show you how different user types interact with the platform.
As a patient, I can manage my health records and control who accesses them.
Switching to a healthcare provider, I can request patient data and manage care.
As a researcher, I can access anonymized datasets for medical research.
For pharmaceutical companies, there are specialized tools for drug development.
And finally, DAO members participate in platform governance."
```

---

## 🚀 **Production vs Demo**

### **Demo Mode (Current)**
- ✅ Role switching enabled
- ✅ Mock data for all roles
- ✅ All features accessible
- ✅ No blockchain transactions

### **Production Mode**
- 🔒 One role per wallet
- 🔒 Real blockchain data
- 🔒 Role verification required
- 🔒 Actual smart contract interactions

---

## 📋 **Troubleshooting**

### **Role Switch Not Working**
- Refresh the page
- Check if wallet is connected
- Clear browser cache
- Try different browser

### **Dashboard Not Loading**
- Verify correct role is selected
- Check network connection
- Ensure all dependencies are installed
- Check browser console for errors

### **Features Not Available**
- Confirm you're using the correct role
- Check if the feature is enabled for your role
- Verify you're on the correct page
- Check demo data is loaded

---

**🎯 You now have complete access to all TrustBridge Protocol features through role switching!**
