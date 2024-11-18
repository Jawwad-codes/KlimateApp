export const API_CONFIG = {
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  GEO: "https://api.openweathermap.org/geo/1.0",
  API_KEY: import.meta.env.VITE_KLIMATE_API_KEY, // Use the VITE_ prefix for environment variables
  DEFAULT_PARAMS: {
    units: "metric",
    appid: import.meta.env.VITE_KLIMATE_API_KEY,
  },
};
