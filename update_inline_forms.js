const fs = require('fs');

function replaceInlineForm(file) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(
            /onsubmit="event\.preventDefault\(\); showToast\('Subscribed successfully!', 'success'\);"/g,
            `onsubmit="event.preventDefault(); showToast('Subscribed successfully! Redirecting...', 'success'); setTimeout(() => { window.location.href = '404.html'; }, 1000);"`
        );
        fs.writeFileSync(file, content);
        console.log(`Updated form in ${file}`);
    }
}

replaceInlineForm('index.html');
replaceInlineForm('contact.html');
