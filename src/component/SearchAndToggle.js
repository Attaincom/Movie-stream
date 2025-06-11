import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

export default function SearchAndToggle({ searchTerm, onSearchChange }) {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900">
      <div className="text-2xl font-bold text-blue-500 mr-6 cursor-pointer">MovieStream</div>

      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded flex-grow max-w-xl"
      />

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded ml-4"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}
