# Docker Deployment Guide

## Quick Start

### Build and Deploy

#### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

#### Option 2: Using build script

```bash
# Build
./build.sh

# Run
docker run -d -p 3000:80 --name bracket-tools bracket-tools:latest
```

#### Option 3: Using Docker directly

```bash
# Build
docker build -t bracket-tools:latest .

# Run the container
docker run -d -p 3000:80 --name bracket-tools bracket-tools:latest
```

The app will be available at `http://localhost:3000`

## Configuration

### Change Port

Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Change 8080 to your desired port
```

Or with docker run:
```bash
docker run -d -p 8080:80 --name bracket-tools bracket-tools:latest
```

## Examples

### Local Development
```bash
docker-compose up -d --build
```

### Production Deployment
```bash
docker-compose up -d --build
```

## Development

For development, use the local dev server instead:
```bash
npm install
npm run dev
```

## Production Deployment

### Build for production
```bash
docker build -t bracket-tools:v1.0.0 .
```

### Tag and push to registry
```bash
docker tag bracket-tools:v1.0.0 your-registry/bracket-tools:v1.0.0
docker push your-registry/bracket-tools:v1.0.0
```

### Deploy to server
```bash
docker pull your-registry/bracket-tools:v1.0.0
docker run -d -p 80:80 --name bracket-tools your-registry/bracket-tools:v1.0.0
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs bracket-tools

# Check if port is already in use
lsof -i :3000
```

### Rebuild after changes
```bash
# Stop and remove old container
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

### Clear everything and start fresh
```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

## File Structure

```
.
├── Dockerfile           # Multi-stage build configuration
├── docker-compose.yml   # Docker Compose configuration
├── nginx.conf          # Nginx server configuration
├── .dockerignore       # Files to exclude from Docker build
└── build.sh            # Build helper script
```

## Performance

The Docker image uses:
- **Multi-stage build** to minimize image size
- **Nginx Alpine** for lightweight production server
- **Gzip compression** for faster loading
- **Static asset caching** for better performance

Final image size: ~50MB
