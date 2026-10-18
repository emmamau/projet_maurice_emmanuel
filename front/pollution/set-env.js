const fs = require('fs');
const path = require('path');

const rawUrl = process.env.API_URL || 'https://pollution-api.onrender.com';
const cleanBaseUrl = rawUrl.trim().replace(/\/+$/, '');
const apiUrl = cleanBaseUrl.endsWith('/api') ? cleanBaseUrl : `${cleanBaseUrl}/api`;

const envContent = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

const targetPath = path.join(__dirname, 'src', 'environments', 'environment.ts');
fs.writeFileSync(targetPath, envContent, 'utf8');
console.log(`[set-env] Configuration dynamique injectée dans environment.ts -> apiUrl = ${apiUrl}`);

