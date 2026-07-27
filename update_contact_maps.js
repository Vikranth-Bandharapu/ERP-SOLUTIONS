const fs = require('fs');

let content = fs.readFileSync('contact.html', 'utf8');

// Replace San Francisco Map
content = content.replace(
    /<!-- Map Placeholder -->\s*<div class="w-full h-48 bg-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-300">\s*<div class="absolute inset-0 bg-\[url\('data:image\/svg\+xml;base64,[^']*'\)\]"><\/div>\s*<i class="fa-solid fa-map-location-dot text-4xl text-blue-400 relative z-10 drop-shadow-md"><\/i>\s*<\/div>/,
    `<div class="w-full h-48 rounded-xl relative overflow-hidden border border-slate-200 shadow-sm group">
                          <img src="assets/images/maps/map_san_francisco.webp" alt="Map of San Francisco" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-500">
                      </div>`
);

// Replace London Map
content = content.replace(
    /<div class="w-full h-48 bg-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-300">\s*<div class="absolute inset-0 bg-\[url\('data:image\/svg\+xml;base64,[^']*'\)\]"><\/div>\s*<i class="fa-solid fa-map-location-dot text-4xl text-blue-400 relative z-10 drop-shadow-md"><\/i>\s*<\/div>/,
    `<div class="w-full h-48 rounded-xl relative overflow-hidden border border-slate-200 shadow-sm group">
                          <img src="assets/images/maps/map_london.webp" alt="Map of London" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-500">
                      </div>`
);

// Replace Singapore Map
content = content.replace(
    /<div class="w-full h-48 bg-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-300">\s*<div class="absolute inset-0 bg-\[url\('data:image\/svg\+xml;base64,[^']*'\)\]"><\/div>\s*<i class="fa-solid fa-map-location-dot text-4xl text-blue-400 relative z-10 drop-shadow-md"><\/i>\s*<\/div>/,
    `<div class="w-full h-48 rounded-xl relative overflow-hidden border border-slate-200 shadow-sm group">
                          <img src="assets/images/maps/map_singapore.webp" alt="Map of Singapore" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-500">
                      </div>`
);

fs.writeFileSync('contact.html', content);
console.log('contact.html updated with actual maps.');
