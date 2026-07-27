const fs = require('fs');

let indexHTML = fs.readFileSync('index.html', 'utf8');

// Replace hero mock with image
const heroMockRegex = /<!-- Dashboard Mockup -->[\s\S]*?<!-- End Mock Dashboard Content -->\s*<\/div>\s*<\/div>/;
const newHeroImg = `<!-- Dashboard Image -->
                    <img src="assets/images/hero_dashboard.webp" alt="ERP Dashboard" class="relative rounded-2xl border border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform perspective-1000 rotate-y-[-5deg] rotate-x-[5deg] w-full h-auto">`;

// Using string replace with regex for hero dashboard, wait, the closing tags might be tricky. Let me just replace the specific div.
indexHTML = indexHTML.replace(/<div class="relative rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden shadow-\[0_20px_50px_rgba\(0,0,0,0\.5\)\] transform perspective-1000 rotate-y-\[-5deg\] rotate-x-\[5deg\]">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, newHeroImg); // Very risky with \s*<\/div>. Let's do a smarter replace.

// I'll just write a script that looks for the start and replaces up to a known string.
const mockStart = `<!-- Dashboard Mockup -->`;
const startIndex = indexHTML.indexOf(mockStart);
if (startIndex !== -1) {
    const endString = `<!-- Floating elements -->`; // Is there a floating element?
    // Alternatively, I will use a precise regex if I know it, or just use string split and slice.
}
