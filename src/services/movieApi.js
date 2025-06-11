// src/services/movieApi.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const genreMap = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance",
  878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
};

const movieAPI = axios.create({
  baseURL: BASE_URL,
});

export const getTrendingMovies = async () => {
  const response = await movieAPI.get(`/trending/movie/week?api_key=${API_KEY}`);
  return response.data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.slice(0, 4) || 'N/A',
    img: `${IMAGE_BASE_URL}${movie.poster_path}`,
    genre: movie.genre_ids?.[0] ? genreMap[movie.genre_ids[0]] || 'Unknown' : 'Unknown',
  }));
};

export const searchMovies = async (query) => {
  const response = await movieAPI.get(`/search/movie?api_key=${API_KEY}&query=${query}`);
  return response.data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.slice(0, 4) || 'N/A',
    img: `${IMAGE_BASE_URL}${movie.poster_path}`,
    genre: movie.genre_ids?.[0] ? genreMap[movie.genre_ids[0]] || 'Unknown' : 'Unknown',
  }));
};

export const getMovieDetails = async (movieId) => {
  const response = await movieAPI.get(`/movie/${movieId}?api_key=${API_KEY}`);
  return response.data;
};

// Mock Watchlist
export const getWatchlistMovies = async () => {
  const movies = await getTrendingMovies();
  return movies.slice(0, 5).map(movie => ({
    id: movie.id,
    title: movie.title,
    category: 'watchlist',
  }));
};

// ✅ Updated: Get recommendations from trending movies
export const getRecommendedMovies = async () => {
  const movies = await getTrendingMovies();
  return movies.slice(5, 10).map(movie => ({
    id: movie.id,
    title: movie.title,
    category: 'recommendation',
  }));
};

export const getTrailerUrl = async (movieId) => {
  try {
    const response = await movieAPI.get(`/movie/${movieId}/videos?api_key=${API_KEY}`);
    const trailers = response.data.results.filter(video => video.type === "Trailer" && video.site === "YouTube");
    return trailers.length > 0 ? `https://www.youtube.com/embed/${trailers[0].key}` : null;
  } catch (err) {
    console.error("Failed to fetch trailer:", err);
    return null;
  }
};
export const getMovieGenres = async () => {
  const response = await movieAPI.get(`/genre/movie/list?api_key=${API_KEY}`);
  return response.data.genres; // array of { id, name }
};
