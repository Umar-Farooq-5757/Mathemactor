import React, { useState } from "react";
import darkMode from "../images/darkMode.svg";
import lightMode from "../images/lightMode.svg";
import { IoGameController } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = ({ isDark, setIsDark }) => {
  return (
    <header className="bg-[teal] text-white px-2 sm:px-5 mb-8">
      <nav className="flex justify-between items-center py-3 max-w-[900px] mx-auto">
        <h1 className="font-bold text-2xl sm:text-3xl">Mathemactor</h1>
        <section className="flex items-center justify-between gap-6">
          <Link to="/minigame">
            <div className="flex items-center justify-between gap-1 text-lg cursor-pointer hover:border-b border-white">
              <IoGameController />
              Mini Game
            </div>
          </Link>
          <div
            onClick={() => {
              setIsDark(!isDark);
              localStorage.setItem("isDarkMode", !isDark);
            }}
            className="theme cursor-pointer"
          >
            {isDark ? (
              <img
                className="w-6 sm:w-8 invert-100"
                src={lightMode}
                alt="light_mode"
              />
            ) : (
              <img
                className="w-6 sm:w-8 invert-100"
                src={darkMode}
                alt="dark_mode"
              />
            )}
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Header;
