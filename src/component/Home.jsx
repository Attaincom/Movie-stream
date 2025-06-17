import { useState } from 'react';
import SearchAndToggle from './SearchAndToggle';
import MovieGrid from './MovieGrid';
import Sidebar from './Sidebar';
import Footer from './footer';
import { DarkModeContext } from '../context/DarkModeContext';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovieTitle, setSelectedMovieTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setSelectedMovieTitle('');
  };

  const handleMovieClick = (movieTitle) => {
    setSelectedMovieTitle(movieTitle);
    setSearchTerm('');
  };

  // Handlers for genre and year change:
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setSelectedMovieTitle('');
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMovieTitle('');
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <SearchAndToggle 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
      />
      <div className="flex flex-col md:flex-row p-4">
        <MovieGrid 
          searchTerm={searchTerm} 
          selectedMovieTitle={selectedMovieTitle}
          selectedGenre={selectedGenre}
          selectedYear={selectedYear}
          onGenreChange={handleGenreChange}
          onYearChange={handleYearChange}
        />
        <Sidebar onMovieClick={handleMovieClick} />
      </div>
      <Footer />
    </div>
  );
}
