# AlgoForce Website - Automated Setup Script
# PowerShell script for Windows

Write-Host "🚀 AlgoForce Website - Automated Setup" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
Write-Host "Checking for npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: v$npmVersion`n" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found." -ForegroundColor Red
    exit 1
}

# Install Frontend Dependencies
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Cyan
Set-Location -Path "frontend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed successfully`n" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend installation failed" -ForegroundColor Red
    exit 1
}

# Install Backend Dependencies
Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Cyan
Set-Location -Path "../backend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend dependencies installed successfully`n" -ForegroundColor Green
} else {
    Write-Host "❌ Backend installation failed" -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file..." -ForegroundColor Yellow
    @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/algoforce
NODE_ENV=development
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ .env file created`n" -ForegroundColor Green
} else {
    Write-Host "ℹ️  .env file already exists`n" -ForegroundColor Blue
}

# Go back to root
Set-Location -Path ".."

Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host "`n=================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Make sure MongoDB is running:" -ForegroundColor White
Write-Host "   net start MongoDB" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start the backend (in a new terminal):" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Start the frontend (in another terminal):" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Open your browser:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "📚 For detailed instructions, see SETUP_INSTRUCTIONS.md" -ForegroundColor Yellow
Write-Host "🎨 For customization help, see CUSTOMIZATION_GUIDE.md" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Happy Building! 🎉" -ForegroundColor Green
