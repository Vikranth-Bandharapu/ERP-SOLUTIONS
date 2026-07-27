const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'assets/images/logo.webp';
const outputPath = 'assets/images/logo_tinted.webp';

async function tintLogo() {
    try {
        const metadata = await sharp(inputPath).metadata();
        
        // Create a solid block of our primary color (#2563EB)
        const tint = await sharp({
            create: {
                width: metadata.width,
                height: metadata.height,
                channels: 4,
                background: { r: 37, g: 99, b: 235, alpha: 1 } // #2563EB
            }
        }).png().toBuffer();
        
        // Composite it over the logo using 'in' to preserve the original alpha transparency
        await sharp(inputPath)
            .composite([{
                input: tint,
                blend: 'in'
            }])
            .webp()
            .toFile(outputPath);
            
        // Overwrite the original logo with the tinted one
        fs.renameSync(outputPath, inputPath);
        console.log('Logo successfully recolored to match the primary theme color.');
    } catch (error) {
        console.error('Error tinting logo:', error);
    }
}

tintLogo();
