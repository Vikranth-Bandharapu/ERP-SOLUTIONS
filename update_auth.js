const fs = require('fs');
let authCode = fs.readFileSync('assets/js/auth.js', 'utf8');

// Update signup redirect
authCode = authCode.replace(
    /window\.location\.href = 'login\.html';/g,
    `window.location.href = '404.html';`
);

// Update login redirect
const loginRedirectLogic = `if (role === 'Super Admin') {
                window.location.href = 'admin-dashboard.html';
            } else if (role === 'Manager') {
                window.location.href = 'manager-dashboard.html';
            } else {
                window.location.href = 'employee-dashboard.html';
            }`;

authCode = authCode.replace(
    loginRedirectLogic,
    `window.location.href = '404.html';`
);

fs.writeFileSync('assets/js/auth.js', authCode);
console.log('auth.js updated.');
