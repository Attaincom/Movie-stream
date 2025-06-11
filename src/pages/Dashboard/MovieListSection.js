import React from 'react';

const MovieListSection = ({ title, items }) => {
  return (
    <div className="mb-6">
      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
      <ul className="text-gray-300 text-sm space-y-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieListSection;
