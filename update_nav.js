const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'blog.html');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Desktop Nav
    content = content.replace(
        /(<a href="industries\.html"[^>]*>Industries<\/a>)/g,
        `$1\n                <a href="blog.html" class="text-slate-600 hover:text-blue-600 font-medium transition">Blog</a>`
    );

    // Mobile Nav
    content = content.replace(
        /(<a href="industries\.html"[^>]*>Industries<\/a>\s*<a href="contact\.html")/g,
        `<a href="industries.html" class="text-white hover:text-blue-400 font-medium">Industries</a>\n            <a href="blog.html" class="text-white hover:text-blue-400 font-medium">Blog</a>\n            <a href="contact.html"`
    );
    
    // In case the mobile regex missed because of different classes, let's just insert before contact.html in mobile specifically
    // A better approach for Mobile Menu:
    content = content.replace(
        /(<a href="industries\.html" class="text-white hover:text-blue-400 font-medium">Industries<\/a>)\s*(<a href="contact\.html")/g,
        `$1\n            <a href="blog.html" class="text-white hover:text-blue-400 font-medium">Blog</a>\n            $2`
    );

    // Footer Company Links
    content = content.replace(
        /(<li><a href="industries\.html"[^>]*>Industries<\/a><\/li>)/g,
        `$1\n                        <li><a href="blog.html" class="hover:text-white transition">Blog</a></li>`
    );

    fs.writeFileSync(file, content);
    console.log(`Updated nav in ${file}`);
});
