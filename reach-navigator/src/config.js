export const isProduction = process.env.NODE_ENV === 'production';
export const backendUrl = isProduction ? 'https://api.reachnav.com' : 'http://localhost:8000';
