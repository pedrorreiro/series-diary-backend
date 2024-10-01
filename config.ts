export const config = {
  tmdb: {
    baseUrl: process.env.TMDB_BASE_URL,
    token: process.env.TMDB_API_KEY,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
};
