import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Topbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full p-4">
      <div className="bg-[#2e2e2e] rounded-lg p-2 flex items-center">
        <FiSearch className="text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-white ml-2 outline-none w-full"
        />
      </div>
    </form>
  );
};

export default Topbar;
