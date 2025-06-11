// components/MovieCard.js
import React from "react";

const MovieCard = ({
  title,
  image,
  genre,
  year,
  rating,
  isFavorite,
  isWatchlisted,
  onToggleFavorite,
  onToggleWatchlist,
  onWatchTrailer,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4 text-white">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm">{genre} | {year}</p>
        <p className="text-sm">Rating: {rating || "N/A"}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={onToggleFavorite}
            className="text-xs bg-red-500 px-2 py-1 rounded"
          >
            {isFavorite ? "Unfavorite" : "Add Favorite"}
          </button>
          <button
            onClick={onToggleWatchlist}
            className="text-xs bg-blue-500 px-2 py-1 rounded"
          >
            {isWatchlisted ? "Remove" : "Add Watchlist"}
          </button>
          <button
            onClick={onWatchTrailer}
            className="text-xs bg-green-500 px-2 py-1 rounded"
          >
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
