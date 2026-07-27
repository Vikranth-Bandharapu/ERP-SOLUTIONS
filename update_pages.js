const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const regex = /<div class="[^"]*">\s*S\s*<\/div>\s*<span class="[^"]*">Stackly(?: Admin| Manager)?<\/span>/g;
const newLogo = `<img src="assets/images/logo.webp" alt="Stackly Logo" class="h-10 w-auto">`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    content = content.replace(regex, newLogo);
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated logo in ${file}`);
    } else {
        console.log(`No match found in ${file}`);
    }
});
