// components/TrailerModal.js
import React from "react";

const TrailerModal = ({ trailerUrl, onClose }) => {
  if (!trailerUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg overflow-hidden w-full max-w-3xl relative">
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <iframe
          width="100%"
          height="400"
          src={trailerUrl}
          title="Movie Trailer"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
