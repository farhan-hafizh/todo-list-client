import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full px-4 py-2 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Your To-Do List</Link>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
        </li>
        <li>
          <Link to="/tasks" className="text-gray-300 hover:text-white">Tasks</Link>
        </li>
        <li>
          <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
