const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const terms = [
    'Explore all modules',
    'View all industries',
    'Learn more',
    'Read technical paper',
    'Read Full Story'
];

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        terms.forEach(term => {
            if (line.includes(term)) {
                console.log(`${file}:${index + 1}: ${line.trim()}`);
            }
        });
    });
});
