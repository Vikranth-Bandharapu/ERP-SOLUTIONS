const fs = require('fs');

let content = fs.readFileSync('industries.html', 'utf8');

// Healthcare
content = content.replace(
    /<div class="h-48 bg-red-50 flex items-center justify-center relative overflow-hidden">[\s\S]*?<\/div>\s*<\/div>/,
    `<div class="h-48 relative overflow-hidden">
                          <img src="assets/images/industry_healthcare.webp" alt="Healthcare" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                          <div class="absolute inset-0 bg-blue-900/40"></div>
                          <div class="absolute inset-0 flex items-center justify-center">
                              <i class="fa-solid fa-heart-pulse text-4xl text-white drop-shadow-md"></i>
                          </div>
                      </div>`
);

// Retail
content = content.replace(
    /<div class="h-48 bg-green-50 flex items-center justify-center relative overflow-hidden">[\s\S]*?<\/div>\s*<\/div>/,
    `<div class="h-48 relative overflow-hidden">
                          <img src="assets/images/industry_retail.webp" alt="Retail & E-commerce" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                          <div class="absolute inset-0 bg-blue-900/40"></div>
                          <div class="absolute inset-0 flex items-center justify-center">
                              <i class="fa-solid fa-store text-4xl text-white drop-shadow-md"></i>
                          </div>
                      </div>`
);

// Logistics
content = content.replace(
    /<div class="h-48 bg-yellow-50 flex items-center justify-center relative overflow-hidden">[\s\S]*?<\/div>\s*<\/div>/,
    `<div class="h-48 relative overflow-hidden">
                          <img src="assets/images/industry_logistics.webp" alt="Logistics & Transport" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                          <div class="absolute inset-0 bg-blue-900/40"></div>
                          <div class="absolute inset-0 flex items-center justify-center">
                              <i class="fa-solid fa-truck-fast text-4xl text-white drop-shadow-md"></i>
                          </div>
                      </div>`
);

// Education
content = content.replace(
    /<div class="h-48 bg-purple-50 flex items-center justify-center relative overflow-hidden">[\s\S]*?<\/div>\s*<\/div>/,
    `<div class="h-48 relative overflow-hidden">
                          <img src="assets/images/industry_education.webp" alt="Education" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                          <div class="absolute inset-0 bg-blue-900/40"></div>
                          <div class="absolute inset-0 flex items-center justify-center">
                              <i class="fa-solid fa-graduation-cap text-4xl text-white drop-shadow-md"></i>
                          </div>
                      </div>`
);

// Real Estate
content = content.replace(
    /<div class="h-48 bg-indigo-50 flex items-center justify-center relative overflow-hidden">[\s\S]*?<\/div>\s*<\/div>/,
    `<div class="h-48 relative overflow-hidden">
                          <img src="assets/images/industry_realestate.webp" alt="Real Estate" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                          <div class="absolute inset-0 bg-blue-900/40"></div>
                          <div class="absolute inset-0 flex items-center justify-center">
                              <i class="fa-solid fa-building-user text-4xl text-white drop-shadow-md"></i>
                          </div>
                      </div>`
);

fs.writeFileSync('industries.html', content);
console.log('industries.html updated with image cards.');
