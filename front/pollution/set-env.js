const fs = require('fs');
const path = require('path');

// Récupère l'hôte fourni par Render (ex: "pollution-api-7xsa" ou "pollution-api-7xsa.onrender.com")
// ou une URL complète si API_URL est spécifiée
let hostOrUrl = (process.env.API_HOST || process.env.API_URL || 'pollution-api-7xsa.onrender.com').trim();

// Supprime tout port résiduel éventuel (ex: :10000)
hostOrUrl = hostOrUrl.split(':')[0];

let fullUrl = '';
if (hostOrUrl.startsWith('http://') || hostOrUrl.startsWith('https://')) {
  fullUrl = hostOrUrl;
} else if (hostOrUrl.endsWith('.onrender.com')) {
  fullUrl = `https://${hostOrUrl}`;
} else {
  // Render fournit le nom d'hôte ou sous-domaine
  fullUrl = `https://${hostOrUrl}.onrender.com`;
}

const cleanBaseUrl = fullUrl.trim().replace(/\/+$/, '');
const apiUrl = cleanBaseUrl.endsWith('/api') ? cleanBaseUrl : `${cleanBaseUrl}/api`;

const envContent = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

const targetPath = path.join(__dirname, 'src', 'environments', 'environment.ts');
fs.writeFileSync(targetPath, envContent, 'utf8');
console.log(`[set-env] Configuration dynamique injectée dans environment.ts -> apiUrl = ${apiUrl}`);

