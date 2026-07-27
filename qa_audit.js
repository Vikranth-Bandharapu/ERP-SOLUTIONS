const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
const assetsDir = path.join(rootDir, 'assets');
const assetFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];

let errors = [];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    
    // Check Links
    const linkRegex = /<a[^>]+href="([^"]+)"/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
        const href = match[1];
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href === '#' || href === '') continue;
        
        // Remove hash from href for file checking
        const fileHref = href.split('#')[0];
        if (fileHref && !htmlFiles.includes(fileHref)) {
            errors.push(`${file}: Broken link -> ${href}`);
        }
    }
    
    // Check Images
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    while ((match = imgRegex.exec(content)) !== null) {
        const src = match[1];
        if (src.startsWith('http') || src.startsWith('data:')) continue;
        
        const assetName = path.basename(src);
        if (!assetFiles.includes(assetName)) {
            errors.push(`${file}: Missing image -> ${src}`);
        }
    }
});

fs.writeFileSync(path.join(rootDir, 'qa_report.txt'), errors.length > 0 ? errors.join('\n') : 'All links and images are valid!', 'utf8');
console.log('QA script finished. See qa_report.txt');
