# TrustBridge Protocol - Dependency Fix Script (PowerShell)
# ======================================================

Write-Host "🔧 TrustBridge Protocol - Dependency Fix Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Function to check if command exists
function Test-Command {
    param($Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Check Node.js version
Write-Host "📋 Checking Node.js version..." -ForegroundColor Yellow
if (Test-Command "node") {
    $NODE_VERSION = node --version
    Write-Host "✅ Node.js version: $NODE_VERSION" -ForegroundColor Green
    
    # Check if version is >= 18
    $NODE_MAJOR = [int]($NODE_VERSION -replace 'v', '' -split '\.')[0]
    if ($NODE_MAJOR -lt 18) {
        Write-Host "❌ Node.js version must be >= 18.0.0" -ForegroundColor Red
        Write-Host "Please update Node.js and try again." -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    exit 1
}

# Check npm version
Write-Host "📋 Checking npm version..." -ForegroundColor Yellow
if (Test-Command "npm") {
    $NPM_VERSION = npm --version
    Write-Host "✅ npm version: $NPM_VERSION" -ForegroundColor Green
    
    # Check if version is >= 9
    $NPM_MAJOR = [int]($NPM_VERSION -split '\.')[0]
    if ($NPM_MAJOR -lt 9) {
        Write-Host "❌ npm version must be >= 9.0.0" -ForegroundColor Red
        Write-Host "Please update npm and try again." -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "❌ npm is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🧹 Cleaning up existing installations..." -ForegroundColor Yellow

# Remove existing node_modules and lock files
Write-Host "📁 Removing existing node_modules directories..." -ForegroundColor Yellow
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "subgraph\node_modules") { Remove-Item -Recurse -Force "subgraph\node_modules" }
if (Test-Path "edge\node_modules") { Remove-Item -Recurse -Force "edge\node_modules" }

Write-Host "📄 Removing lock files..." -ForegroundColor Yellow
$lockFiles = @(
    "package-lock.json",
    "yarn.lock", 
    "pnpm-lock.yaml",
    "subgraph\package-lock.json",
    "subgraph\yarn.lock",
    "edge\package-lock.json",
    "edge\yarn.lock"
)

foreach ($file in $lockFiles) {
    if (Test-Path $file) {
        Remove-Item -Force $file
    }
}

Write-Host "🗑️ Cleaning npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host ""
Write-Host "📦 Installing root dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Root dependencies installed successfully" -ForegroundColor Green
}
else {
    Write-Host "❌ Failed to install root dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing subgraph dependencies..." -ForegroundColor Yellow
Set-Location "subgraph"
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Subgraph dependencies installed successfully" -ForegroundColor Green
}
else {
    Write-Host "❌ Failed to install subgraph dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ".."

Write-Host ""
Write-Host "📦 Installing edge function dependencies..." -ForegroundColor Yellow
Set-Location "edge"
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Edge function dependencies installed successfully" -ForegroundColor Green
}
else {
    Write-Host "❌ Failed to install edge function dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ".."

Write-Host ""
Write-Host "🔍 Running dependency checks..." -ForegroundColor Yellow

# Check for unmet dependencies
Write-Host "📋 Checking for unmet dependencies..." -ForegroundColor Yellow
$npmOutput = npm ls --depth=0 2>&1
if ($npmOutput -match "UNMET DEPENDENCY") {
    Write-Host "⚠️ Unmet dependencies found:" -ForegroundColor Yellow
    $npmOutput | Select-String "UNMET DEPENDENCY"
}
else {
    Write-Host "✅ No unmet dependencies found" -ForegroundColor Green
}

# Check for security vulnerabilities
Write-Host "🔒 Running security audit..." -ForegroundColor Yellow
try {
    npm audit --audit-level=moderate
}
catch {
    Write-Host "⚠️ Some security vulnerabilities found (check above)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Dependency fix completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "- Root dependencies: ✅ Installed" -ForegroundColor Green
Write-Host "- Subgraph dependencies: ✅ Installed" -ForegroundColor Green
Write-Host "- Edge function dependencies: ✅ Installed" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 You can now run the following commands:" -ForegroundColor Cyan
Write-Host "  npm run dev          # Start development server" -ForegroundColor White
Write-Host "  npm run build        # Build the project" -ForegroundColor White
Write-Host "  npm run test         # Run tests" -ForegroundColor White
Write-Host "  npm run deploy:all   # Deploy all components" -ForegroundColor White
