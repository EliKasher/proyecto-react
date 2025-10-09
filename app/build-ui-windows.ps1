# Script equivalente a lo que npm run build:ui haría en el back pero para powershell
# Odio windows
cd backend
Remove-item -Force -Recurse -ErrorAction SilentlyContinue dist
cd ../frontend
npm run build
Copy-item -Force -Recurse dist ../backend
cd ..