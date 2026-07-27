const fs = require('fs');

const files = ['index.html', 'about.html', 'erp-modules.html', 'industries.html', 'contact.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Find header block
        const headerStart = content.indexOf('<header');
        const headerEnd = content.indexOf('</header>') + 9;
        
        if (headerStart !== -1 && headerEnd !== -1) {
            let headerContent = content.substring(headerStart, headerEnd);
            
            // Replace Logo size
            headerContent = headerContent.replace(/class="h-10 w-auto"/g, 'class="h-14 w-auto"');
            
            // Replace Nav links
            headerContent = headerContent.replace(/text-white hover:text-blue-300 font-medium/g, 'text-blue-600 font-bold hover:text-blue-700');
            headerContent = headerContent.replace(/text-slate-300 hover:text-white font-medium/g, 'text-slate-600 hover:text-blue-600 font-medium');
            
            // Replace Login link
            headerContent = headerContent.replace(/text-white font-medium py-2 px-4 hover:text-blue-300/g, 'text-slate-700 font-medium py-2 px-4 hover:text-blue-600');
            
            // Replace Mobile button
            headerContent = headerContent.replace(/text-white text-2xl focus:outline-none/g, 'text-slate-800 text-2xl focus:outline-none');
            
            // Put it back
            content = content.substring(0, headerStart) + headerContent + content.substring(headerEnd);
            fs.writeFileSync(file, content);
            console.log(`Updated header in ${file}`);
        }
    }
});
