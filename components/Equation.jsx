import React from "react";

const Equation = ({ equationType, equation, clickHandler, linkToSolver }) => {
  return (
    <main className="equations-container mt-3 px-3">
      <section className="equation bg-[#fff] border border-gray-400 rounded-lg py-3 px-6 pl-10 flex justify-between items-center">
        {/* <section className="equation bg-[#a8dadc] border border-gray-400 rounded-lg py-3 px-6 pl-10 flex justify-between items-center"> */}
        <div className="flex flex-col justify-center items-start gap-1">
          <p className="text-sm">{equationType}</p>
          {/* <h2 className='text-3xl font-bold italic'>ax<sup>2</sup> + bx + c = 0</h2> */}
          <h2 className="text-3xl font-bold italic">{equation}</h2>
        </div>
        <a href={linkToSolver}>
          <button
            onClick={clickHandler}
            className="bg-[#00695C] hover:scale-105 cursor-pointer text-white transition-all active:scale-[.90] duration-100 font-bold py-1 px-2 rounded-md"
          >
            Solve
          </button>
        </a>
      </section>
    </main>
  );
};

export default Equation;
