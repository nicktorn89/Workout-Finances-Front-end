export const API_HOST = process.env.MODE === 'production' ? process.env.PROD_API : process.env.DEV_API;

console.log('API_HOST', API_HOST, 'MODE', process.env.MODE, 'PROD_API', process.env.PROD_API);

export const HOST = 'http://localhost:8080/';
