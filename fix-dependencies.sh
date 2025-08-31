#!/bin/bash

echo "🔧 TrustBridge Protocol - Dependency Fix Script"
echo "================================================"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js version
echo "📋 Checking Node.js version..."
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js version: $NODE_VERSION"
    
    # Check if version is >= 18
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -lt 18 ]; then
        echo "❌ Node.js version must be >= 18.0.0"
        echo "Please update Node.js and try again."
        exit 1
    fi
else
    echo "❌ Node.js is not installed"
    exit 1
fi

# Check npm version
echo "📋 Checking npm version..."
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm version: $NPM_VERSION"
    
    # Check if version is >= 9
    NPM_MAJOR=$(echo $NPM_VERSION | cut -d'.' -f1)
    if [ "$NPM_MAJOR" -lt 9 ]; then
        echo "❌ npm version must be >= 9.0.0"
        echo "Please update npm and try again."
        exit 1
    fi
else
    echo "❌ npm is not installed"
    exit 1
fi

echo ""
echo "🧹 Cleaning up existing installations..."

# Remove existing node_modules and lock files
echo "📁 Removing existing node_modules directories..."
rm -rf node_modules
rm -rf subgraph/node_modules
rm -rf edge/node_modules

echo "📄 Removing lock files..."
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml
rm -f subgraph/package-lock.json
rm -f subgraph/yarn.lock
rm -f edge/package-lock.json
rm -f edge/yarn.lock

echo "🗑️ Cleaning npm cache..."
npm cache clean --force

echo ""
echo "📦 Installing root dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Root dependencies installed successfully"
else
    echo "❌ Failed to install root dependencies"
    exit 1
fi

echo ""
echo "📦 Installing subgraph dependencies..."
cd subgraph
npm install

if [ $? -eq 0 ]; then
    echo "✅ Subgraph dependencies installed successfully"
else
    echo "❌ Failed to install subgraph dependencies"
    exit 1
fi

cd ..

echo ""
echo "📦 Installing edge function dependencies..."
cd edge
npm install

if [ $? -eq 0 ]; then
    echo "✅ Edge function dependencies installed successfully"
else
    echo "❌ Failed to install edge function dependencies"
    exit 1
fi

cd ..

echo ""
echo "🔍 Running dependency checks..."

# Check for unmet dependencies
echo "📋 Checking for unmet dependencies..."
npm ls --depth=0 2>&1 | grep "UNMET DEPENDENCY" || echo "✅ No unmet dependencies found"

# Check for security vulnerabilities
echo "🔒 Running security audit..."
npm audit --audit-level=moderate || echo "⚠️ Some security vulnerabilities found (check above)"

echo ""
echo "✅ Dependency fix completed!"
echo ""
echo "📋 Summary:"
echo "- Root dependencies: ✅ Installed"
echo "- Subgraph dependencies: ✅ Installed"
echo "- Edge function dependencies: ✅ Installed"
echo ""
echo "🚀 You can now run the following commands:"
echo "  npm run dev          # Start development server"
echo "  npm run build        # Build the project"
echo "  npm run test         # Run tests"
echo "  npm run deploy:all   # Deploy all components"
