import React from "react";

const DefaultScreen = ({isDark}) => {
  return (
    <main className={`solver border border-gray-400 flex justify-center items-center rounded-sm p-3 mt-3 min-h-80 ${isDark?'bg-gray-800 text-white':'bg-[#e7e7e7]: text-black'}`}>
      <h1 className="font-bold text-3xl text-center">
        Select an equation or expression to get started.
      </h1>
    </main>
  );
};

export default DefaultScreen;
