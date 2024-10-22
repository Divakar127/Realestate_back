import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-white shadow-lg h-[80px] flex justify-between items-center px-5 md:px-10 lg:px-20">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 items-center text-gray-700">
        <li className="hover:underline hover:text-blue-600 font-medium">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline hover:text-blue-600 font-medium">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:underline hover:text-blue-600 font-medium">
          {currentUser ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/sign-in">Sign-in</Link>
          )}
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        {toggle ? (
          <AiOutlineCloseCircle
            onClick={() => setToggle(!toggle)}
            className="text-3xl text-gray-700 cursor-pointer"
          />
        ) : (
          <AiOutlineMenu
            onClick={() => setToggle(!toggle)}
            className="text-3xl text-gray-700 cursor-pointer"
          />
        )}
      </div>

      {/* Mobile Menu */}
      <ul
        className={`fixed top-0 left-0 h-full w-3/4 bg-gray-900 text-white p-10 transition-transform duration-300 ${
          toggle ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <li className="mb-6">
          <Link to="/" className="text-xl" onClick={() => setToggle(false)}>
            Home
          </Link>
        </li>
        <li className="mb-6">
          <Link to="/about" className="text-xl" onClick={() => setToggle(false)}>
            About
          </Link>
        </li>
        <li className="mb-6">
          <Link to="/sign-in" className="text-xl" onClick={() => setToggle(false)}>
            Sign In
          </Link>
        </li>
        <li className="mb-6">
          <Link to="/profile" className="text-xl" onClick={() => setToggle(false)}>
            Profile
          </Link>
        </li>
      </ul>

      {/* Search and Profile */}
      <div className="hidden md:flex items-center gap-6">
        <form
          className="relative bg-gray-100 rounded-full shadow-inner flex items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="p-2 pl-4 w-full bg-transparent text-gray-700 focus:outline-none rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition">
            <FaSearch />
          </button>
        </form>
        <Link to="/profile">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover shadow-lg"
            />
          ) : (
            <HiOutlineUserCircle className="text-3xl text-gray-700" />
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
