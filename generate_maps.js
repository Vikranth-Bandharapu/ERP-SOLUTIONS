const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const destDir = path.join(__dirname, 'assets', 'images', 'maps');
if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

function createMapSVG(cityName, color) {
    return `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F8FAFC" />
        
        <!-- Abstract grid/roads -->
        <path d="M 0 50 L 800 50 M 0 100 L 800 100 M 0 150 L 800 150 M 0 200 L 800 200 M 0 250 L 800 250 M 0 300 L 800 300 M 0 350 L 800 350" stroke="#E2E8F0" stroke-width="2" />
        <path d="M 100 0 L 100 400 M 200 0 L 200 400 M 300 0 L 300 400 M 400 0 L 400 400 M 500 0 L 500 400 M 600 0 L 600 400 M 700 0 L 700 400" stroke="#E2E8F0" stroke-width="2" />
        
        <!-- Abstract river/coastline -->
        <path d="M 0 100 Q 200 250 400 200 T 800 300" fill="none" stroke="#BAE6FD" stroke-width="40" stroke-linecap="round" />
        <path d="M 100 400 Q 300 200 600 0" fill="none" stroke="#BAE6FD" stroke-width="30" stroke-linecap="round" />
        
        <!-- Major Highway -->
        <path d="M 0 350 Q 400 150 800 50" fill="none" stroke="#CBD5E1" stroke-width="8" />
        
        <!-- Center Pin Background -->
        <circle cx="400" cy="200" r="40" fill="${color}" opacity="0.1" />
        
        <!-- Pin Icon -->
        <g transform="translate(376, 170) scale(1.5)">
            <path d="M16,0C7.163,0,0,7.163,0,16c0,11.232,14.654,26.438,15.228,27.039C15.438,43.26,15.719,43.375,16,43.375
                c0.28,0,0.562-0.115,0.772-0.336C17.345,42.438,32,27.232,32,16C32,7.163,24.837,0,16,0z M16,24c-4.411,0-8-3.589-8-8s3.589-8,8-8
                s8,3.589,8,8S20.411,24,16,24z" fill="${color}"/>
        </g>
        
        <!-- City Text -->
        <rect x="330" y="240" width="140" height="40" rx="8" fill="white" opacity="0.9" />
        <text x="400" y="265" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#334155" text-anchor="middle">${cityName}</text>
    </svg>`;
}

const locations = [
    { id: 'san_francisco', name: 'San Francisco', color: '#2563EB' }, // Blue
    { id: 'london', name: 'London', color: '#DC2626' },             // Red
    { id: 'singapore', name: 'Singapore', color: '#059669' }         // Green
];

async function generateMaps() {
    for (const loc of locations) {
        const svgString = createMapSVG(loc.name, loc.color);
        const destPath = path.join(destDir, `map_${loc.id}.webp`);
        
        try {
            await sharp(Buffer.from(svgString))
                .webp({ quality: 80 })
                .toFile(destPath);
                
            const stats = fs.statSync(destPath);
            console.log(`Generated map_${loc.id}.webp: ${(stats.size / 1024).toFixed(2)} KB`);
        } catch (error) {
            console.error(`Error generating ${loc.id}:`, error);
        }
    }
}

generateMaps();
