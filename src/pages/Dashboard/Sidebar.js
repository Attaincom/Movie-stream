import React, { useEffect, useState } from "react";
import {
  FiGrid,
  FiClock,
  FiFilm,
  FiSettings,
  FiLogOut,
  FiHeart,
  FiList,
  FiMenu,
  FiX
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onNavigate, currentPage }) => {
  const navigate = useNavigate();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      setFavoritesCount(favorites.length);
      setWatchlistCount(watchlist.length);
    };

    updateCounts();
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  const navItemClass = (page) =>
    currentPage === page
      ? "flex items-center gap-2 font-semibold text-white bg-[#2e2e2e] px-4 py-3 rounded"
      : "flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer px-4 py-3";

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex justify-start p-4 rounded-md bg-[#1e1e1e]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FiX size={24} className="text-white" />
        ) : (
          <FiMenu size={24} className="text-white" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative z-50 top-0 left-0 h-full w-64 bg-[#1e1e1e] text-white p-4 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-8 mt-2 px-4">Dashboard</h2>
            <ul className="space-y-2">
              <li
                onClick={() => {
                  onNavigate("Dashboard");
                  setIsOpen(false);
                }}
                className={navItemClass("Dashboard")}
              >
                <FiGrid /> Dashboard
              </li>
              <li
                onClick={() => {
                  onNavigate("Recommendations");
                  setIsOpen(false);
                }}
                className={navItemClass("Recommendations")}
              >
                <FiFilm /> Recommendations
              </li>
              <li
                onClick={() => {
                  onNavigate("Favorites");
                  setIsOpen(false);
                }}
                className={navItemClass("Favorites")}
              >
                <FiHeart /> Favorites
                {favoritesCount > 0 && (
                  <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white">
                    {favoritesCount}
                  </span>
                )}
              </li>
              <li
                onClick={() => {
                  onNavigate("Watchlist");
                  setIsOpen(false);
                }}
                className={navItemClass("Watchlist")}
              >
                <FiList /> Watchlist
                {watchlistCount > 0 && (
                  <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
                    {watchlistCount}
                  </span>
                )}
              </li>
              <li
                onClick={() => {
                  onNavigate("History");
                  setIsOpen(false);
                }}
                className={navItemClass("History")}
              >
                <FiClock /> History
              </li>
              <li
                onClick={() => {
                  onNavigate("Settings");
                  setIsOpen(false);
                }}
                className={navItemClass("Settings")}
              >
                <FiSettings /> Settings
              </li>
            </ul>
          </div>

          <div className="mb-4 px-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-white cursor-pointer w-full py-3"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;