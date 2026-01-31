import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportDataDir = path.join(__dirname, '../public/export_data');
const outputFile = path.join(__dirname, '../public/all_competitions.json');

// Read all folders in export_data
const folders = fs.readdirSync(exportDataDir);

const competitionsMap = new Map();

folders.forEach(folder => {
    const dataPath = path.join(exportDataDir, folder, 'data.json');
    
    if (fs.existsSync(dataPath)) {
        try {
            const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
            
            if (data.brackets && data.brackets.length > 0) {
                const bracket = data.brackets[0];
                const compId = bracket.competition_id;
                const seasonId = data.season_id || folder;
                
                if (!competitionsMap.has(compId)) {
                    competitionsMap.set(compId, {
                        competition_id: compId,
                        competition_name: bracket.competition_name || 'Unknown',
                        country_id: bracket.country_id || null,
                        seasons: []
                    });
                }
                
                const comp = competitionsMap.get(compId);
                
                // Add season if not already exists
                if (!comp.seasons.find(s => s.id === seasonId)) {
                    comp.seasons.push({
                        id: seasonId,
                        name: data.season_name || `Season ${seasonId}`,
                        year: data.season_year || 'Unknown',
                        is_current: false
                    });
                }
            }
        } catch (e) {
            console.error(`Error processing ${folder}:`, e.message);
        }
    }
});

// Convert to array and sort
const competitions = Array.from(competitionsMap.values());

// Sort seasons by year (descending)
competitions.forEach(comp => {
    comp.seasons.sort((a, b) => {
        const yearA = parseInt(a.year.split('-')[0]) || 0;
        const yearB = parseInt(b.year.split('-')[0]) || 0;
        return yearB - yearA;
    });
});

// Write output
fs.writeFileSync(outputFile, JSON.stringify(competitions, null, 2));

console.log(`✅ Generated ${outputFile}`);
console.log(`📊 Found ${competitions.length} competitions with ${competitions.reduce((sum, c) => sum + c.seasons.length, 0)} seasons`);
