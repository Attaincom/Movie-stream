// components/MovieSection.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieSection = ({
  title,
  movies = [],
  favorites = [],
  watchlist = [],
  onToggleFavorite = () => {},
  onToggleWatchlist = () => {},
  onWatchTrailer = () => {},
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            {...movie}
            isFavorite={favorites.some(m => m.title === movie.title)}
            isWatchlisted={watchlist.some(m => m.title === movie.title)}
            onToggleFavorite={() => onToggleFavorite(movie)}
            onToggleWatchlist={() => onToggleWatchlist(movie)}
            onWatchTrailer={() => onWatchTrailer(movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
