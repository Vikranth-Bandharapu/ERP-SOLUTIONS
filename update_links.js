const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const targetTexts = [
    'Start Free Trial',
    'Request Demo',
    'Request a Demo',
    'Get Started',
    'Contact Sales',
    'Contact Solutions Team',
    'View all industries',
    'Try HR Module',
    'Learn more'
];

let totalChanges = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // We will find all <a> tags and replace their href if their content matches any of the target texts
    // A regex to match <a> tags: /<a\s+[^>]*>.*?<\/a>/gs
    content = content.replace(/<a\s+([^>]*?)href="([^"]*)"([^>]*)>(.*?)<\/a>/gis, (match, beforeHref, currentHref, afterHref, innerText) => {
        // Check if innerText contains any of the target texts
        const matchesTarget = targetTexts.some(text => innerText.includes(text));
        if (matchesTarget && currentHref !== '404.html') {
            return `<a ${beforeHref}href="404.html"${afterHref}>${innerText}</a>`;
        }
        return match;
    });

    // Also replace <button ...>...Request Demo...</button> etc.
    content = content.replace(/<button\s+([^>]*)>(.*?)<\/button>/gis, (match, attrs, innerText) => {
        const matchesTarget = targetTexts.some(text => innerText.includes(text));
        if (matchesTarget && !attrs.includes('onclick=')) {
            // Add onclick event
            return `<button onclick="window.location.href='404.html'" ${attrs}>${innerText}</button>`;
        }
        return match;
    });

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Updated links in ${file}`);
        totalChanges++;
    }
});

console.log(`Finished updating. Changed files: ${totalChanges}`);
