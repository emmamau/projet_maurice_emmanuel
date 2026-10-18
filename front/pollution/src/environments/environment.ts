export const environment = {
  production: true,
  // En production, pointe soit vers l'API backend Render, soit vers le proxy relatif /api
  apiUrl: (typeof window !== 'undefined' && (window as any).__API_URL__) 
    || 'https://pollution-api.onrender.com/api'
};

