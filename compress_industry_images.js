const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputImages = [
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\industry_healthcare_1785067836571.jpg', name: 'industry_healthcare.webp' },
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\industry_retail_1785067846791.jpg', name: 'industry_retail.webp' },
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\industry_logistics_1785067858197.jpg', name: 'industry_logistics.webp' },
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\industry_education_1785067870977.jpg', name: 'industry_education.webp' },
    { src: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8937ef72-1bf9-4f4b-8108-237791e685dd\\industry_realestate_1785067882995.jpg', name: 'industry_realestate.webp' }
];

const destDir = path.join(__dirname, 'assets', 'images');

async function convertImages() {
    for (const img of inputImages) {
        const destPath = path.join(destDir, img.name);
        try {
            await sharp(img.src)
                .resize(600, 400, { fit: 'cover' })
                .webp({ quality: 65 })
                .toFile(destPath);
            
            const stats = fs.statSync(destPath);
            console.log(`Saved ${img.name}: ${(stats.size / 1024).toFixed(2)} KB`);
        } catch (error) {
            console.error(`Error processing ${img.name}:`, error);
        }
    }
}

convertImages();
