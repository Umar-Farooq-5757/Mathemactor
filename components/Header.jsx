import React, { useState } from "react";
import darkMode from "../images/darkMode.svg";
import lightMode from "../images/lightMode.svg";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <header className="bg-[teal] text-white px-2 sm:px-5 mb-8">
      <nav className="flex justify-between items-center py-3 max-w-[900px] mx-auto">
        <h1 className="font-bold text-2xl sm:text-3xl">Mathemactor</h1>
        <div onClick={()=>alert("Still working on it!")} className="theme cursor-pointer">
          {isDark ? (
            <img
              className="w-6 sm:w-8 invert-100"
              src={darkMode}
              alt="dark_mode"
            />
          ) : (
            <img
              className="w-6 sm:w-8 invert-100"
              src={lightMode}
              alt="light_mode"
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
