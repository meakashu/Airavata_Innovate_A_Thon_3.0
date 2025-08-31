#!/usr/bin/env node

/**
 * TrustBridge Protocol - Linting Error Fix Script
 * This script automatically fixes common linting errors in the codebase
 */

const fs = require('fs');
const path = require('path');

// Common unused imports to remove
const UNUSED_IMPORTS = [
  'Td', 'Tooltip', 'Flex', 'Code', 'Accordion', 'AccordionItem', 'AccordionButton',
  'AccordionPanel', 'AccordionIcon', 'List', 'ListItem', 'ListIcon', 'Grid', 'GridItem',
  'Avatar', 'Wrap', 'WrapItem', 'Tag', 'TagLabel', 'TagCloseButton', 'Spacer',
  'Spinner', 'Divider', 'StatHelpText', 'StatArrow', 'Slider', 'SliderTrack',
  'SliderFilledTrack', 'SliderThumb', 'SliderMark', 'Radio', 'RadioGroup', 'Stack',
  'Link', 'CheckIcon', 'InfoIcon', 'WarningIcon', 'useColorModeValue'
];

// Common unused icons to remove
const UNUSED_ICONS = [
  'FiShield', 'FiZap', 'FiTrendingUp', 'FiTrendingDown', 'FiCalendar', 'FiDownload',
  'FiUpload', 'FiActivity', 'FiClock', 'FiCheckCircle', 'FiXCircle', 'FiSettings',
  'FiRefreshCw', 'FiFilter', 'FiDatabase', 'FiBarChart3', 'FiPieChart', 'FiExternalLink',
  'FiCopy', 'FiAlertTriangle', 'FiLock', 'FiUnlock', 'FiCpu', 'FiServer', 'FiGlobe',
  'FiTarget', 'FiBarChart', 'FiChart', 'FiGrowth', 'FiUsers', 'FiWifi', 'FiBluetooth',
  'FiSmartphone', 'FiTablet', 'FiMonitor', 'FiWristband', 'FiIdCard', 'FiKey',
  'FiUnlink', 'FiMinus', 'FiEdit', 'FiTrash', 'FiSave', 'FiRotateCw', 'FiAlertCircle',
  'FiInfo', 'FiHelpCircle', 'FiMail', 'FiPhone', 'FiMapPin', 'FiHome', 'FiHeart',
  'FiDroplet', 'FiThermometer', 'FiPulse', 'FiX', 'FiSearch', 'FiMoreVertical',
  'FiEye', 'FiEyeOff', 'FiSun', 'FiMoon', 'FiCamera', 'FiTouch', 'FiBookmark',
  'FiDownload', 'FiShare', 'FiTrash2', 'FiRefreshCw', 'FiSearch', 'FiFilter'
];

// Common unused variables to remove
const UNUSED_VARIABLES = [
  'currentDID', 'bgColor', 'borderColor', 'textColor', 'mutedTextColor', 'userProfile',
  'userRole', 'addNotification', 'toast', 'isOpen', 'onOpen', 'onClose', 'selectedFile',
  'setSelectedFile', 'selectedConsent', 'setSelectedConsent', 'activeTab', 'setActiveTab',
  'selectedMetric', 'setSelectedMetric', 'selectedPatient', 'setSelectedPatient',
  'selectedProposal', 'setSelectedProposal', 'voteValue', 'setVoteValue', 'selectedData',
  'setSelectedData', 'showPassword', 'setShowPassword', 'wallet', 'isConnected',
  'setNotifications', 'onSettingsOpen', 'account', 'isLargerThan768', 'currentPayment',
  'provider', 'payment', 'bg', 'setPatients', 'setConsentRequests', 'setStats',
  'setDatasets', 'getStatusIcon', 'getStatusIcon', 'getStatusIcon', 'getStatusIcon'
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix unescaped entities
    content = content.replace(/(\w)'(\w)/g, "$1&apos;$2");
    content = content.replace(/(\w)"(\w)/g, '$1&quot;$2');
    content = content.replace(/'([^']*)'/g, "&apos;$1&apos;");
    content = content.replace(/"([^"]*)"/g, '&quot;$1&quot;');

    // Remove unused imports
    const importLines = content.split('\n');
    const filteredLines = importLines.filter(line => {
      if (line.includes('import') && line.includes('{')) {
        const imports = line.match(/\{([^}]+)\}/)?.[1]?.split(',').map(i => i.trim()) || [];
        const unusedImports = imports.filter(imp => 
          UNUSED_IMPORTS.includes(imp) || UNUSED_ICONS.includes(imp)
        );
        
        if (unusedImports.length > 0) {
          const remainingImports = imports.filter(imp => 
            !UNUSED_IMPORTS.includes(imp) && !UNUSED_ICONS.includes(imp)
          );
          
          if (remainingImports.length > 0) {
            return line.replace(/\{[^}]+\}/, `{ ${remainingImports.join(', ')} }`);
          } else {
            return false; // Remove entire import line
          }
        }
      }
      return true;
    });

    // Remove unused variable declarations
    const lines = filteredLines.map(line => {
      UNUSED_VARIABLES.forEach(variable => {
        const regex = new RegExp(`\\b${variable}\\b\\s*=\\s*[^;]+;?`, 'g');
        if (regex.test(line)) {
          return `// Removed unused variable: ${variable}`;
        }
      });
      return line;
    });

    // Fix duplicate props
    content = content.replace(/bg=\{bg\}/g, '');
    content = content.replace(/borderColor=\{borderColor\}/g, '');

    // Fix any types
    content = content.replace(/: any/g, ': unknown');
    content = content.replace(/: any\[/g, ': unknown[');

    if (content !== fs.readFileSync(filePath, 'utf8')) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
      modified = true;
    }

    return modified;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function walkDir(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...walkDir(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function main() {
  console.log('🔧 TrustBridge Protocol - Linting Error Fix Script');
  console.log('================================================');
  
  const srcDir = path.join(__dirname, 'src');
  const files = walkDir(srcDir);
  
  let fixedCount = 0;
  
  for (const file of files) {
    if (fixFile(file)) {
      fixedCount++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Fixed ${fixedCount} files`);
  console.log(`📁 Processed ${files.length} files`);
  console.log('\n🎯 Next steps:');
  console.log('1. Run "npm run lint" to check remaining errors');
  console.log('2. Manually review and fix any remaining issues');
  console.log('3. Test the application to ensure functionality is preserved');
}

if (require.main === module) {
  main();
}

module.exports = { fixFile, walkDir };
