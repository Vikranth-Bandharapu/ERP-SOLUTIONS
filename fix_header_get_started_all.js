const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Mobile Header for index.html (and others if missed)
    content = content.replace(
        /<a href="404\.html"([^>]*)>Get Started<\/a>/g,
        '<a href="signup.html"$1>Get Started</a>'
    );
    
    // In case the desktop header in index.html is pointing to signup.html already, this will just leave it.
    // Ensure all desktop headers point to signup.html
    content = content.replace(
        /<a href="404\.html" class="btn-primary py-2 px-6 rounded-full font-medium shadow-lg hover-lift">Get Started<\/a>/g,
        '<a href="signup.html" class="btn-primary py-2 px-6 rounded-full font-medium shadow-lg hover-lift">Get Started</a>'
    );

    // Make absolutely sure 'Get Started' in the header/mobile menu goes to signup.html
    content = content.replace(
        /<a href="404\.html" class="text-blue-400 font-bold">Get Started<\/a>/g,
        '<a href="signup.html" class="text-blue-400 font-bold">Get Started</a>'
    );
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Fixed Mobile/Desktop Get Started in ${file}`);
    }
});
