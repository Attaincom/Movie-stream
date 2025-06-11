import React from 'react';
import MovieListSection from '../pages/Dashboard/MovieListSection';

const History = () => {
  const watched = ['The Godfather', 'The Batman', 'Tenet'];
  return <MovieListSection title="History" items={watched} />;
};

export default History;
