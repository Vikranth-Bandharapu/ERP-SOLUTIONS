const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Desktop Header
    content = content.replace(
        /<a href="signup\.html" class="btn-primary py-2 px-6 rounded-full font-medium shadow-lg hover-lift">Get Started<\/a>/g,
        '<a href="login.html" class="btn-primary py-2 px-6 rounded-full font-medium shadow-lg hover-lift">Get Started</a>'
    );

    // Mobile Header
    content = content.replace(
        /<a href="signup\.html" class="text-blue-400 font-bold">Get Started<\/a>/g,
        '<a href="login.html" class="text-blue-400 font-bold">Get Started</a>'
    );
    
    // Other Get Started buttons in mobile menu that might have different classes
    content = content.replace(
        /<a href="signup\.html" class="btn-primary py-3 rounded-lg font-medium">Get Started<\/a>/g,
        '<a href="login.html" class="btn-primary py-3 rounded-lg font-medium">Get Started</a>'
    );

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Changed Get Started to login.html in ${file}`);
    }
});
