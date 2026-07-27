const fs = require('fs');

let content = fs.readFileSync('about.html', 'utf8');

// Replace Elena
content = content.replace(
    /<div class="w-full h-full bg-slate-300 flex items-center justify-center text-4xl\s*text-slate-400"><i class="fa-solid fa-user"><\/i><\/div>\s*<\/div>\s*<h4[^>]*>Elena Rodriguez<\/h4>/,
    `<img src="assets/images/team/elena_rodriguez.webp" alt="Elena Rodriguez" class="w-full h-full object-cover">\n                      </div>\n                      <h4 class="font-bold text-lg text-dark group-hover:text-blue-600 transition">Elena Rodriguez</h4>`
);

// Replace David
content = content.replace(
    /<div class="w-full h-full bg-slate-300 flex items-center justify-center text-4xl\s*text-slate-400"><i class="fa-solid fa-user"><\/i><\/div>\s*<\/div>\s*<h4[^>]*>David Chen<\/h4>/,
    `<img src="assets/images/team/david_chen.webp" alt="David Chen" class="w-full h-full object-cover">\n                      </div>\n                      <h4 class="font-bold text-lg text-dark group-hover:text-blue-600 transition">David Chen</h4>`
);

// Replace Marcus
content = content.replace(
    /<div class="w-full h-full bg-slate-300 flex items-center justify-center text-4xl\s*text-slate-400"><i class="fa-solid fa-user"><\/i><\/div>\s*<\/div>\s*<h4[^>]*>Marcus Johnson<\/h4>/,
    `<img src="assets/images/team/marcus_johnson.webp" alt="Marcus Johnson" class="w-full h-full object-cover">\n                      </div>\n                      <h4 class="font-bold text-lg text-dark group-hover:text-blue-600 transition">Marcus Johnson</h4>`
);

// Replace Sophia
content = content.replace(
    /<div class="w-full h-full bg-slate-300 flex items-center justify-center text-4xl\s*text-slate-400"><i class="fa-solid fa-user"><\/i><\/div>\s*<\/div>\s*<h4[^>]*>Sophia Patel<\/h4>/,
    `<img src="assets/images/team/sophia_patel.webp" alt="Sophia Patel" class="w-full h-full object-cover">\n                      </div>\n                      <h4 class="font-bold text-lg text-dark group-hover:text-blue-600 transition">Sophia Patel</h4>`
);

fs.writeFileSync('about.html', content);
console.log('about.html updated with team images.');
