import React from "react";

const Footer = ({isDark}) => {
  return (
    <div className={`fixed bottom-0 py-2 text-center w-full ${isDark? 'bg-gray-800 text-white':'bg-[#f0f0f0] text-black'}`}>
      Made with <span>❤️</span> by{" "}
      <span className="font-serif">Umar Farooq</span>
    </div>
  );
};

export default Footer;
