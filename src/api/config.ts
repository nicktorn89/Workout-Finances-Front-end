export const API_HOST = process.env.MODE === 'production' ? process.env.PROD_API : process.env.DEV_API;
console.log('API_HOST', API_HOST);
export const HOST = 'http://localhost:8080/';
