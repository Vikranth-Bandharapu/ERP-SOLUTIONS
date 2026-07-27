const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = [
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\hero_dashboard_1785065347852.jpg', dest: 'assets/images/hero_dashboard.webp' },
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\about_team_1785065368157.jpg', dest: 'assets/images/about_team.webp' },
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\industry_manufacturing_1785065471863.jpg', dest: 'assets/images/industry_manufacturing.webp' },
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\module_finance_1785065484898.jpg', dest: 'assets/images/module_finance.webp' },
];

async function processImages() {
    for (const img of images) {
        if (fs.existsSync(img.src)) {
            const destPath = path.join(__dirname, img.dest);
            try {
                await sharp(img.src)
                    .resize(800) // Resize width to 800px to ensure it stays below 100KB
                    .webp({ quality: 60 })
                    .toFile(destPath);
                
                const stats = fs.statSync(destPath);
                console.log(`Converted: ${img.dest} - Size: ${(stats.size / 1024).toFixed(2)} KB`);
            } catch (err) {
                console.error(`Error processing ${img.src}:`, err);
            }
        } else {
            console.warn(`File not found: ${img.src}`);
        }
    }
}

processImages();
