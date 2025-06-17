import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

export default function SearchAndToggle({ searchTerm, onSearchChange }) {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 bg-gray-900">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-500 cursor-pointer text-center md:text-left">
        MovieStream
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded w-full md:max-w-xl"
      />

      {/* Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded w-full md:w-auto"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}
