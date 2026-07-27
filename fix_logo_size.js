const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    content = content.replace(/class="h-10 w-auto"/g, 'class="h-14 w-auto"');
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated logo size in ${file}`);
    }
});
