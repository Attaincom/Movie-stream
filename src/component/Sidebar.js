// Sidebar.js
import { useEffect, useState } from 'react';
import { getWatchlistMovies, getRecommendedMovies } from '../services/movieApi';

export default function Sidebar({ onMovieClick }) {
  const [watchlist, setWatchlist] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const watchlistMovies = await getWatchlistMovies();
        const recommendedMovies = await getRecommendedMovies();

        setWatchlist(watchlistMovies);
        setRecommendations(recommendedMovies);
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    };

    fetchSidebarData();
  }, []);

  return (
    <div className="w-full md:w-64 p-4 text-white">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Watchlist</h3>
        {watchlist.map((movie, i) => (
          <div
            key={i}
            onClick={() => onMovieClick(movie.title)}
            className="bg-gray-800 p-2 rounded mb-1 cursor-pointer hover:bg-gray-700"
          >
            {movie.title}
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Recommendations</h3>
        {recommendations.map((movie, i) => (
          <div
            key={i}
            onClick={() => onMovieClick(movie.title)} // Ensure it's title, not object
            className="bg-gray-800 p-2 rounded mb-1 cursor-pointer hover:bg-gray-700"
          >
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
}
