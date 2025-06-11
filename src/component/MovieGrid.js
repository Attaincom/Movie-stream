// src/components/MovieGrid.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies } from "../services/movieApi";

export default function MovieGrid({ searchTerm = "", selectedMovieTitle = "" }) {
  const initialVisible = 6;
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [allMovies, setAllMovies] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setAllMovies(data);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const genres = [
    "All",
    ...Array.from(new Set(allMovies.map((movie) => movie.genre))),
  ];

  const filteredByGenre =
    selectedGenre === "All"
      ? allMovies
      : allMovies.filter((movie) => movie.genre === selectedGenre);

  const filteredBySearch = searchTerm.trim()
    ? allMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.year.includes(searchTerm)
      )
    : null;

  const filteredBySelectedMovie =
    typeof selectedMovieTitle === "string" && selectedMovieTitle.trim() !== ""
      ? allMovies.filter(
          (movie) =>
            movie.title.toLowerCase() === selectedMovieTitle.toLowerCase()
        )
      : null;

  const moviesToShow = filteredBySelectedMovie
    ? filteredBySelectedMovie
    : filteredBySearch
    ? filteredBySearch
    : filteredByGenre;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCount(initialVisible);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setVisibleCount(initialVisible);
  };

  const openLoginPrompt = (movie) => {
    setSelectedMovie(movie);
    setShowLoginModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 flex-1 min-h-screen bg-black text-white relative">
      {/* Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white text-gray-800 p-8 rounded-2xl w-80 shadow-2xl border border-gray-200">
  <h3 className="text-xl font-extrabold mb-3 text-center text-gray-900">Login Required</h3>
  <p className="mb-6 text-sm text-center">
    Please log in to view <strong className="text-blue-600">{selectedMovie?.title}</strong>.
  </p>
  <div className="flex justify-center gap-4">
    <button
      onClick={() => setShowLoginModal(false)}
      className="px-5 py-2 text-sm font-medium rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
    >
      Cancel
    </button>
    <button
      onClick={() => {
        setShowLoginModal(false);
        window.location.href = "/login"; // or '/signup' if needed
      }}
      className="px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Login
    </button>
  </div>
</div>

        </div>
      )}

      {/* Left Section: Sign Up / Login */}
      <div className="md:w-1/3 bg-gray-900 rounded-lg p-6 mb-6 md:mb-0 md:mr-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to MovieStream</h2>
        <p className="mb-4">
          Enjoy exclusive content and trending movies for NGN 2,000/month. Watch
          now, cancel anytime.
        </p>
        <Link to="/Login" className="block">
          <button className="bg-white text-black font-semibold px-4 py-2 rounded w-full mb-2">
            Member? Sign in
          </button>
        </Link>
        <div className="text-center my-2">or</div>
         <Link to="/Signup" className="block">
        <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full">
          Start your 7-day free trial
        </button>
        </Link>
        <p className="text-xs mt-2 text-gray-400">
          *Cancel your trial at any time
        </p>
      </div>

      {/* Right Section: Movies */}
      <div className="md:w-2/3">
        {!searchTerm && !selectedMovieTitle && (
          <>
            <h2 className="text-xl font-semibold mb-4">Trending Movies</h2>
            <div className="flex items-center mb-4">
              <span className="mr-2">Genre:</span>
              <select
                value={selectedGenre}
                onChange={handleGenreChange}
                className="bg-gray-800 text-white p-2 rounded"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {moviesToShow.slice(0, visibleCount).map((movie, index) => (
            <div
              key={movie.id}
              className="text-white cursor-pointer"
              onClick={() => openLoginPrompt(movie)}
            >
              <img
                src={
                  movie.img ||
                  "https://via.placeholder.com/300x400?text=No+Image"
                }
                alt={movie.title}
                className={`rounded object-cover w-full ${
                  index < 3 ? "h-40" : "h-64"
                }`}
              />
              <p className="mt-2">{movie.title}</p>
              <p className="text-sm text-gray-400">
                {movie.year} | {movie.genre}
              </p>
            </div>
          ))}
        </div>

        {!searchTerm && !selectedMovieTitle && (
          <div className="mt-6 text-center">
            {visibleCount < moviesToShow.length && (
              <button
                onClick={handleLoadMore}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-white font-semibold"
              >
                Load More
              </button>
            )}
            {visibleCount > initialVisible && (
              <button
                onClick={handleShowLess}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-white font-semibold ml-4"
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
