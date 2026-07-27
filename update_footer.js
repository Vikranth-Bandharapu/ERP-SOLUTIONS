const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// The new footer sections we want to construct
const newProductColumn = `<div>
                    <h4 class="text-white font-bold mb-6 tracking-wide">Product</h4>
                    <ul class="space-y-3 text-sm">
                        <li><a href="404.html" class="hover:text-white transition">Finance</a></li>
                        <li><a href="404.html" class="hover:text-white transition">HR & Payroll</a></li>
                        <li><a href="404.html" class="hover:text-white transition">Inventory</a></li>
                        <li><a href="404.html" class="hover:text-white transition">CRM</a></li>
                        <li><a href="404.html" class="hover:text-white transition">Pricing</a></li>
                    </ul>
                </div>`;

const newCompanyColumn = `<div>
                    <h4 class="text-white font-bold mb-6 tracking-wide">Company</h4>
                    <ul class="space-y-3 text-sm">
                        <li><a href="index.html" class="hover:text-white transition">Home</a></li>
                        <li><a href="about.html" class="hover:text-white transition">About</a></li>
                        <li><a href="erp-modules.html" class="hover:text-white transition">Modules</a></li>
                        <li><a href="industries.html" class="hover:text-white transition">Industries</a></li>
                        <li><a href="contact.html" class="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>`;

const newLegalColumn = `<div>
                    <h4 class="text-white font-bold mb-6 tracking-wide">Legal</h4>
                    <ul class="space-y-3 text-sm">
                        <li><a href="404.html" class="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="404.html" class="hover:text-white transition">Terms of Service</a></li>
                        <li><a href="404.html" class="hover:text-white transition">Cookie Policy</a></li>
                        <li><a href="404.html" class="hover:text-white transition">Security</a></li>
                    </ul>
                </div>`;

const oldSocialLinksRegex = /<a href="[^"]*" class="w-10 h-10 rounded-full[^>]*>(<i class="fa-brands fa-[^"]+"><\/i>)<\/a>/g;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find footer block
    const footerStart = content.indexOf('<footer');
    const footerEnd = content.indexOf('</footer>');
    
    if (footerStart !== -1 && footerEnd !== -1) {
        let footerContent = content.substring(footerStart, footerEnd + 9);
        
        // Update product column
        footerContent = footerContent.replace(/<div>\s*<h4[^>]*>Product<\/h4>[\s\S]*?<\/ul>\s*<\/div>/, newProductColumn);
        
        // Update company column
        footerContent = footerContent.replace(/<div>\s*<h4[^>]*>Company<\/h4>[\s\S]*?<\/ul>\s*<\/div>/, newCompanyColumn);
        
        // Update legal column
        footerContent = footerContent.replace(/<div>\s*<h4[^>]*>Legal<\/h4>[\s\S]*?<\/ul>\s*<\/div>/, newLegalColumn);
        
        // Update social links to 404
        footerContent = footerContent.replace(oldSocialLinksRegex, (match, p1) => {
            return match.replace(/href="[^"]*"/, 'href="404.html"');
        });
        
        // Replace in content
        content = content.substring(0, footerStart) + footerContent + content.substring(footerEnd + 9);
        fs.writeFileSync(file, content);
        console.log(`Updated footer in ${file}`);
    }
});
