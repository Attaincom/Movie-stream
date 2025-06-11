// App.js
import React, { useState, useEffect } from "react";
import Sidebar from "./Dashboard/Sidebar";
import Topbar from "./Dashboard/Topbar";
import MovieSection from "./Dashboard/MovieSection";
import MovieListSection from "./Dashboard/MovieListSection";
import TrailerModal from "./Dashboard/TrailerModal";
import { getTrendingMovies, getTrailerUrl, getMovieGenres } from "../services/movieApi";

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setFavorites(storedFavorites);
    setWatchlist(storedWatchlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await getMovieGenres();
        setGenres(genreData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleToggleFavorite = (movie) => {
    const exists = favorites.some((m) => m.id === movie.id);
    if (exists) {
      setFavorites(favorites.filter((m) => m.id !== movie.id));
      alert(`Removed "${movie.title}" from Favorites`);
    } else {
      setFavorites([...favorites, movie]);
      alert(`Added "${movie.title}" to Favorites`);
    }
  };

  const handleToggleWatchlist = (movie) => {
    const exists = watchlist.some((m) => m.id === movie.id);
    if (exists) {
      setWatchlist(watchlist.filter((m) => m.id !== movie.id));
      alert(`Removed "${movie.title}" from Watchlist`);
    } else {
      setWatchlist([...watchlist, movie]);
      alert(`Added "${movie.title}" to Watchlist`);
    }
  };

  const handleWatchTrailer = async (movieId) => {
    const url = await getTrailerUrl(movieId);
    if (url) {
      setTrailerUrl(url);
    } else {
      alert("Trailer not available.");
    }
  };

  const filteredMovies = movies
    .filter((movie) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        movie.title?.toLowerCase().includes(term) ||
        movie.genre?.toLowerCase().includes(term) ||
        movie.release_date?.includes(term) ||
        movie.rating?.toString().includes(term);

      return (
        matchesSearch &&
        (genre ? movie.genre === genre : true) &&
        (year ? movie.release_date?.startsWith(year) : true) &&
        (rating ? movie.rating >= parseFloat(rating) : true)
      );
    })
    .sort((a, b) => {
      if (sortBy === "releaseDate") {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sortBy === "popularity") {
        return b.popularity - a.popularity;
      }
      return 0;
    });

  const topRated = ["The Shawshank Redemption", "The Godfather"];
  const trending = ["The Batman", "Uncharted", "Eternals", "The Irishman"];
  const upcoming = [
    "Doctor Strange in the Multiverse of Madness",
    "Jurassic World Dominion",
  ];

  return (
    <div className="flex bg-[#121212] min-h-screen">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <div className="flex-1 p-6">
        <Topbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {currentPage === "Dashboard" && (
          <>
            <div className="flex flex-wrap gap-4 text-white mb-6">
              {/* Genre Filter */}
              <select
                onChange={(e) => setGenre(e.target.value)}
                className="bg-gray-800 p-2 rounded"
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-gray-800 p-2 rounded w-24"
              />

              <input
                type="number"
                step="0.1"
                placeholder="Min Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="bg-gray-800 p-2 rounded w-28"
              />

              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 p-2 rounded"
              >
                <option value="">Sort By</option>
                <option value="releaseDate">Release Date</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>

            <MovieSection
              title="All Movies"
              movies={filteredMovies.map((movie) => ({
                ...movie,
                image: movie.img,
              }))}
              favorites={favorites}
              watchlist={watchlist}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchlist={handleToggleWatchlist}
              onWatchTrailer={handleWatchTrailer}
            />

            {filteredMovies.length === 0 && (
              <p className="text-white mt-4">Movie not available.</p>
            )}

            {searchTerm === "" && genre === "" && year === "" && rating === "" && sortBy === "" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <MovieListSection title="Top Rated" items={topRated} />
                <MovieListSection title="Trending" items={trending} />
                <MovieListSection title="Upcoming" items={upcoming} />
              </div>
            )}
          </>
        )}

        {/* Trailer Modal */}
        {trailerUrl && <TrailerModal trailerUrl={trailerUrl} onClose={() => setTrailerUrl("")} />}
      </div>
    </div>
  );
}

export default App;
