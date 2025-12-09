#!/bin/bash

echo "🚀 Building Boss Menu Phone App..."

cd ui

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building UI..."
npm run build

# Copy dist to ui folder for FiveM
echo "📁 Copying build files..."
rm -rf ../ui_built
cp -r dist ../ui_built

echo "✅ Build complete!"
echo "📱 The app is ready to use with FiveM"
