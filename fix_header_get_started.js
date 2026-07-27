const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Desktop Header
    // <a href="404.html" class="btn-primary py-2 px-6 rounded-full font-medium shadow-lg hover-lift">Get Started</a>
    // Mobile Header
    // <a href="404.html" class="text-blue-400 font-bold">Get Started</a>

    // We can target specific elements based on classes that exist in the header
    content = content.replace(
        /<a href="404\.html" class="btn-primary py-2 px-6 rounded-full font-medium shadow-lg hover-lift">Get Started<\/a>/g,
        '<a href="signup.html" class="btn-primary py-2 px-6 rounded-full font-medium shadow-lg hover-lift">Get Started</a>'
    );

    content = content.replace(
        /<a href="404\.html" class="text-blue-400 font-bold">Get Started<\/a>/g,
        '<a href="signup.html" class="text-blue-400 font-bold">Get Started</a>'
    );

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Reverted Get Started in header of ${file}`);
    }
});
