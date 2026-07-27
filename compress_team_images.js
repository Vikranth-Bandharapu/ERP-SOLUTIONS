const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputImages = [
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\elena_rodriguez_1785067505651.jpg', name: 'elena_rodriguez.webp' },
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\david_chen_1785067525913.jpg', name: 'david_chen.webp' },
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\marcus_johnson_1785067538553.jpg', name: 'marcus_johnson.webp' },
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\sophia_patel_1785067549719.jpg', name: 'sophia_patel.webp' }
];

const destDir = path.join(__dirname, 'assets', 'images', 'team');

// Ensure directory exists
if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

async function convertImages() {
    for (const img of inputImages) {
        const destPath = path.join(destDir, img.name);
        try {
            await sharp(img.src)
                .resize(400, 400, { fit: 'cover' })
                .webp({ quality: 70 })
                .toFile(destPath);
            
            const stats = fs.statSync(destPath);
            console.log(`Saved ${img.name}: ${(stats.size / 1024).toFixed(2)} KB`);
        } catch (error) {
            console.error(`Error processing ${img.name}:`, error);
        }
    }
}

convertImages();
