#!/bin/bash

echo "🔨 Building Bracket Tools Docker Image..."

# Build the Docker image
docker build -t bracket-tools:latest .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "To run the container:"
    echo "  docker run -d -p 3000:80 --name bracket-tools bracket-tools:latest"
    echo ""
    echo "Or use docker-compose:"
    echo "  docker-compose up -d"
else
    echo "❌ Build failed!"
    exit 1
fi
