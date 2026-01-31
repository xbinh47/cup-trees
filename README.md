# Bracket Tools

Tournament bracket visualization and analysis tools built with Astro.

## Features

- 🏆 Interactive bracket visualization
- 📊 Match details with statistics
- ✅ Data integrity verification
- 🔍 Competition and season filtering
- 🎨 Modern, responsive UI
- 🚀 Fast and lightweight

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:4321/bracket-viewer`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Deployment

See [DOCKER.md](./DOCKER.md) for detailed Docker deployment instructions.

Quick start:
```bash
# Set your domain
export PUBLIC_BASE_URL=https://your-domain.com

# Build and run
./build.sh
docker-compose up -d
```

## Configuration

### Environment Variables

Create a `.env` file:

```bash
# Public base URL (domain only, no paths)
PUBLIC_BASE_URL=https://your-domain.com
```

For local development:
```bash
PUBLIC_BASE_URL=http://localhost:4321
```

## Project Structure

```
.
├── public/
│   ├── all_competitions.json    # Competition metadata
│   └── export_data/             # Season data folders
│       └── {season_id}/
│           ├── data.json        # Raw match data
│           └── tree.json        # Bracket tree structure
├── src/
│   ├── layouts/
│   │   └── Layout.astro         # Base layout
│   ├── pages/
│   │   ├── index.astro          # Home page
│   │   └── bracket-viewer.astro # Bracket viewer page
│   └── tools/
│       └── bracket-viewer/
│           ├── main.ts          # Main app logic
│           ├── ui.ts            # UI rendering
│           ├── bracket-renderer.ts  # Bracket visualization
│           ├── verification.ts  # Data verification
│           └── styles.css       # Styles
├── scripts/
│   └── rebuild-competitions.js  # Rebuild competitions list
├── Dockerfile                   # Docker build config
├── docker-compose.yml           # Docker Compose config
└── build.sh                     # Build helper script
```

## Data Management

### Rebuild Competitions List

If you add new season data, rebuild the competitions list:

```bash
node scripts/rebuild-competitions.js
```

This scans all folders in `public/export_data/` and generates `public/all_competitions.json`.

## Usage

1. **Select Competition**: Search or browse competitions
2. **Select Season**: Choose a season from the dropdown
3. **Load**: Click "Load Season" to visualize the bracket
4. **Verify**: Click "Verify" to check data integrity
5. **Explore**: Hover over matches to see details, click for full statistics

## Development

### Tech Stack

- **Astro** - Static site generator
- **TypeScript** - Type-safe JavaScript
- **Nginx** - Production web server (Docker)

### Adding New Features

1. Create new tool in `src/tools/`
2. Add page in `src/pages/`
3. Update home page with link

### Code Style

- Use TypeScript for type safety
- Follow existing code structure
- Keep functions small and focused
- Add comments for complex logic

## Deployment

### Docker (Recommended)

```bash
PUBLIC_BASE_URL=https://your-domain.com docker-compose up -d --build
```

### Manual

```bash
npm run build
# Deploy dist/ folder to your web server
```

## Troubleshooting

### Data not loading
- Check `PUBLIC_BASE_URL` is set correctly
- Verify files exist in `public/export_data/`
- Check browser console for errors

### Build fails
- Ensure Node.js >= 22.12.0
- Clear `node_modules` and reinstall
- Check for TypeScript errors

### Docker issues
- See [DOCKER.md](./DOCKER.md) for detailed troubleshooting

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.
