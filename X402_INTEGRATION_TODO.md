# X402 Integration TODO - What's Left to Connect

## 🎯 **Integration Requirements**

To make X402 Coinbase integration work properly with the Hospital Dashboard, the following connections need to be made:

---

## 🔗 **1. Import Required Components**

### **Add to HospitalDashboard.tsx**:
```typescript
// Add these imports at the top of HospitalDashboard.tsx
import X402PaymentProcessor from '../X402PaymentProcessor';
import { coinbaseService } from '../../services/coinbase-integration';
import { useNotifications } from '../../contexts/NotificationProvider';
```

---

## 🔗 **2. Add Payment State Management**

### **Add State Variables**:
```typescript
// Add these state variables in HospitalDashboard component
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [selectedPayment, setSelectedPayment] = useState<any>(null);
const [paymentType, setPaymentType] = useState<'data_access' | 'emergency' | 'upload' | null>(null);
const [paymentAmount, setPaymentAmount] = useState<number>(0);
const [selectedPatient, setSelectedPatient] = useState<any>(null);
```

---

## 🔗 **3. Add Payment Functions**

### **Add Payment Handler Functions**:
```typescript
// Add these functions in HospitalDashboard component

// Handle data access payment
const handleDataAccessPayment = async (patient: any, recordId: string) => {
  setSelectedPatient(patient);
  setPaymentType('data_access');
  setPaymentAmount(5.00); // $5 for data access
  setSelectedPayment({
    type: 'data_access',
    patientId: patient.id,
    recordId: recordId,
    amount: 5.00,
    description: `Data access for ${patient.name} - Record ${recordId}`
  });
  setShowPaymentModal(true);
};

// Handle emergency access payment
const handleEmergencyPayment = async (emergency: any) => {
  setPaymentType('emergency');
  setPaymentAmount(25.00); // $25 for emergency access
  setSelectedPayment({
    type: 'emergency',
    patientId: emergency.patientId,
    emergencyType: emergency.emergencyType,
    amount: 25.00,
    description: `Emergency access for ${emergency.patientName}`
  });
  setShowPaymentModal(true);
};

// Handle record upload payment
const handleUploadPayment = async (recordType: string, fileSize: number) => {
  setPaymentType('upload');
  setPaymentAmount(10.00); // $10 for record upload
  setSelectedPayment({
    type: 'upload',
    recordType: recordType,
    fileSize: fileSize,
    amount: 10.00,
    description: `Upload ${recordType} record`
  });
  setShowPaymentModal(true);
};

// Handle payment completion
const handlePaymentComplete = (payment: any) => {
  console.log('Payment completed:', payment);
  toast({
    title: 'Payment Successful',
    description: `Payment of $${payment.amount} has been processed`,
    status: 'success',
    duration: 5000,
    isClosable: true,
  });
  setShowPaymentModal(false);
  
  // Handle post-payment actions based on type
  if (paymentType === 'data_access') {
    // Grant data access
    console.log('Granting data access to patient records');
  } else if (paymentType === 'emergency') {
    // Grant emergency access
    console.log('Granting emergency access');
  } else if (paymentType === 'upload') {
    // Allow record upload
    console.log('Allowing record upload');
  }
};

// Handle revenue split
const handleRevenueSplit = (split: any) => {
  console.log('Revenue split:', split);
  toast({
    title: 'Revenue Split',
    description: `Patient: $${split.patientShare}, Protocol: $${split.protocolShare}`,
    status: 'info',
    duration: 5000,
    isClosable: true,
  });
};

// Handle DeFi reinvestment
const handleDeFiReinvest = (position: any) => {
  console.log('DeFi position created:', position);
  toast({
    title: 'DeFi Position Created',
    description: `${position.type} position in ${position.protocol}`,
    status: 'success',
    duration: 5000,
    isClosable: true,
  });
};
```

---

## 🔗 **4. Add Payment Buttons to UI**

### **Add to Patient Actions**:
```typescript
// In the patient table actions column, add payment button
<Td>
  <HStack spacing={2}>
    <Button
      size="sm"
      variant="ghost"
      colorScheme="blue"
      onClick={() => handleViewPatient(patient)}
    >
      <Icon as={FiEye} />
    </Button>
    <Button
      size="sm"
      variant="ghost"
      colorScheme="green"
      onClick={() => window.location.href = `/patients/${patient?.id}`}
    >
      <Icon as={FiEdit} />
    </Button>
    {/* ADD THIS PAYMENT BUTTON */}
    <Button
      size="sm"
      variant="ghost"
      colorScheme="purple"
      onClick={() => handleDataAccessPayment(patient, 'REC-001')}
      leftIcon={<FiDollarSign />}
    >
      Access ($5)
    </Button>
  </HStack>
</Td>
```

### **Add to Emergency Access Section**:
```typescript
// In the emergency access section, add payment button
<HStack spacing={2}>
  <Button
    size="sm"
    colorScheme="green"
    onClick={() => handleEmergencyAction(emergency, 'approve')}
  >
    <Icon as={FiCheck} mr={1} />
    Approve
  </Button>
  {/* ADD THIS PAYMENT BUTTON */}
  <Button
    size="sm"
    colorScheme="purple"
    onClick={() => handleEmergencyPayment(emergency)}
    leftIcon={<FiDollarSign />}
  >
    Pay ($25)
  </Button>
  <Button
    size="sm"
    colorScheme="red"
    variant="outline"
    onClick={() => handleEmergencyAction(emergency, 'deny')}
  >
    <Icon as={FiX} mr={1} />
    Deny
  </Button>
</HStack>
```

### **Add to Records Upload Section**:
```typescript
// In the records upload section, add payment button
<CardHeader>
  <HStack justify="space-between">
    <VStack align="start" spacing={1}>
      <Heading size="md" color="gray.800">Upload Patient Records</Heading>
      <Text color="gray.600" fontSize="sm">
        Upload diagnostic reports, lab results, and medical documents for patients
      </Text>
    </VStack>
    <HStack spacing={2}>
      <Badge colorScheme="blue" variant="subtle">
        Provider Upload
      </Badge>
      {/* ADD THIS PAYMENT BUTTON */}
      <Button
        size="sm"
        colorScheme="purple"
        onClick={() => handleUploadPayment('lab_results', 2048576)}
        leftIcon={<FiDollarSign />}
      >
        Pay to Upload ($10)
      </Button>
    </HStack>
  </HStack>
</CardHeader>
```

---

## 🔗 **5. Add Payment Modal**

### **Add at the end of the component (before closing tags)**:
```typescript
{/* X402 Payment Modal */}
{showPaymentModal && (
  <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} size="xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>X402 Payment - {paymentType?.replace('_', ' ').toUpperCase()}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack spacing={4} align="stretch">
          <Alert status="info">
            <AlertIcon />
            <Box>
              <AlertTitle>Payment Required</AlertTitle>
              <AlertDescription>
                Amount: ${paymentAmount} USDC
                {selectedPayment && (
                  <Text mt={2}>
                    {selectedPayment.description}
                  </Text>
                )}
              </AlertDescription>
            </Box>
          </Alert>
          
          <X402PaymentProcessor
            onPaymentComplete={handlePaymentComplete}
            onRevenueSplit={handleRevenueSplit}
            onDeFiReinvest={handleDeFiReinvest}
          />
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
)}
```

---

## 🔗 **6. Add Payment Statistics**

### **Add Payment Stats Card**:
```typescript
// Add this card to the statistics section
<Card bg={cardBg} borderRadius="2xl" border="1px" borderColor={borderColor}>
  <CardBody p={6}>
    <VStack spacing={4} align="start">
      <HStack justify="space-between" w="full">
        <Text fontSize="sm" fontWeight="medium" color="gray.600">X402 Payments</Text>
        <Icon as={FiDollarSign} color="purple.500" boxSize={5} />
      </HStack>
      <Stat>
        <StatNumber fontSize="3xl" fontWeight="bold" color="gray.800">
          $0.00
        </StatNumber>
        <StatHelpText color="purple.500">
          <StatArrow type="increase" />
          Ready for payments
        </StatHelpText>
      </Stat>
    </VStack>
  </CardBody>
</Card>
```

---

## 🔗 **7. Add Required Icons**

### **Add to imports**:
```typescript
// Add FiDollarSign to the existing icon imports
import {
  // ... existing icons ...
  FiDollarSign,
} from 'react-icons/fi';
```

---

## 🔗 **8. Test Integration**

### **Test Steps**:
1. **Test Data Access Payment**: Click "Access ($5)" button on patient
2. **Test Emergency Payment**: Click "Pay ($25)" button on emergency
3. **Test Upload Payment**: Click "Pay to Upload ($10)" button
4. **Verify Payment Flow**: Check that payment modal opens
5. **Verify Coinbase Integration**: Test with developer credit
6. **Verify Revenue Split**: Check 50/50 split functionality

---

## ✅ **Summary of What's Left**

### **Files to Modify**:
- ✅ `src/components/dashboard/HospitalDashboard.tsx` - Main integration

### **Components to Add**:
- ✅ Import statements for X402PaymentProcessor and coinbaseService
- ✅ Payment state management
- ✅ Payment handler functions
- ✅ Payment buttons in UI
- ✅ Payment modal
- ✅ Payment statistics

### **Integration Points**:
- ✅ Patient data access payments
- ✅ Emergency access payments
- ✅ Record upload payments
- ✅ Payment completion handling
- ✅ Revenue split handling
- ✅ DeFi reinvestment handling

### **Testing Required**:
- ✅ Payment button functionality
- ✅ Payment modal display
- ✅ Coinbase API integration
- ✅ USDC payment processing
- ✅ Revenue split calculation
- ✅ Transaction status tracking

---

## 🚀 **Implementation Priority**

### **High Priority**:
1. Add imports and state management
2. Add payment handler functions
3. Add payment buttons to UI
4. Add payment modal

### **Medium Priority**:
1. Add payment statistics
2. Add error handling
3. Add loading states

### **Low Priority**:
1. Add payment history
2. Add analytics dashboard
3. Add advanced DeFi features

---

## 🎯 **Expected Result**

After implementing these connections, the Hospital Dashboard will have:

- **Payment Buttons**: On patient actions, emergency access, and record uploads
- **Payment Modal**: X402 payment processor integration
- **Coinbase Integration**: Real USDC payments via Coinbase API
- **Revenue Splitting**: Automatic 50/50 split between patient and protocol
- **Transaction Tracking**: Real-time payment status monitoring
- **DeFi Integration**: Staking and yield farming options

**This will make X402 Coinbase integration fully functional with the Hospital Dashboard!** 🎉
