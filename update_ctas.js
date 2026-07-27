const fs = require('fs');

let mainJs = fs.readFileSync('assets/js/main.js', 'utf8');

// The current dead links logic is:
/*
    // 6. Custom 404 Routing for dead links
    const allLinks = document.querySelectorAll('a, button');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        // If it's a dummy link or explicit action that needs routing to 404
        if (href === '#' || (!href && link.tagName.toLowerCase() === 'button' && !link.classList.contains('no-route'))) {
*/

const oldRoutingStart = `    // 6. Custom 404 Routing for dead links
    const allLinks = document.querySelectorAll('a, button');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        // If it's a dummy link or explicit action that needs routing to 404
        if (href === '#' || (!href && link.tagName.toLowerCase() === 'button' && !link.classList.contains('no-route'))) {`;

const newRoutingStart = `    // 6. Custom 404 Routing for dead links and CTA buttons
    const allLinks = document.querySelectorAll('a, button');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isCTA = link.classList.contains('btn-primary') || link.innerText.toLowerCase().includes('start free trial') || link.innerText.toLowerCase().includes('get started') || link.innerText.toLowerCase().includes('request demo') || link.innerText.toLowerCase().includes('learn more');
        
        // If it's a dummy link, explicit action, or a CTA button that needs routing to 404
        if (href === '#' || isCTA || (!href && link.tagName.toLowerCase() === 'button' && !link.classList.contains('no-route'))) {`;

mainJs = mainJs.replace(oldRoutingStart, newRoutingStart);

fs.writeFileSync('assets/js/main.js', mainJs);
console.log('Updated main.js to intercept all CTAs.');
