import "./App.css";
import { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Equation from "../components/Equation.jsx";
import DefaultScreen from "../components/formulas/DefaultScreen.jsx";
import LinearEquation from "../components/formulas/equations/LinearEquation.jsx";
import QuadraticEquation from "../components/formulas/equations/QuadraticEquation.jsx";
import SquaredBinomial from "../components/formulas/expressions/SquaredBinomial.jsx";
import CubicBinomial from "../components/formulas/expressions/CubicBinomial.jsx";
import CustomizedBinomial from "../components/formulas/expressions/CustomizedBinomial.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("DefaultScreen");

  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDarkMode"))
  );

  return (
    <>
      <div
        className={`min-h-[100vh] ${
          isDark ? "bg-gray-900 text-white" : "bg-[#f0f0f0] text-black"
        }`}
      >
        {/* <div className="bg-[red] min-h-[100vh]"> */}
        <Header isDark={isDark} setIsDark={setIsDark} />
        <main
          className={`main-container flex items-start px-2 ${
            isDark ? "bg-gray-900 text-white" : "bg-[#f0f0f0] text-black"
          }`}
        >
          <section className="equations w-[60%]">
            <h1 className="text-3xl font-bold ml-3">Equations:</h1>
            <Equation
              isDark={isDark}
              clickHandler={() => setActiveTab("LinearEquation")}
              equationType="Solve linear equation"
              equation={<span>ax + b = 0</span>}
              linkToSolver={"#linear"}
            />
            <Equation
              isDark={isDark}
              clickHandler={() => setActiveTab("QuadraticEquation")}
              equationType="Solve quadratic equation"
              equation={
                <span>
                  ax<sup>2</sup> + bx + c = 0
                </span>
              }
              linkToSolver={"#quadratic"}
            />
            <h1 className="text-3xl font-bold ml-3 mt-4">Expressions:</h1>
            <Equation
              isDark={isDark}
              clickHandler={() => setActiveTab("SquaredBinomial")}
              equationType="Solve squared binomial"
              equation={
                <span>
                  (a + b)<sup>2</sup>
                </span>
              }
              linkToSolver={"#squaredBinomial"}
            />
            <Equation
              isDark={isDark}
              clickHandler={() => setActiveTab("CubicBinomial")}
              equationType="Solve cubic binomial"
              equation={
                <span>
                  (a + b)<sup>3</sup>
                </span>
              }
              linkToSolver={"#cubicBinomial"}
            />
            <Equation
              isDark={isDark}
              clickHandler={() => setActiveTab("CustomizedBinomial")}
              equationType="Solve customized binomial"
              equation={
                <span>
                  (a + b)
                  <sup>
                    <i>x</i>
                  </sup>
                </span>
              }
              linkToSolver={"#customizedBinomial"}
            />
          </section>
          <section className="solver w-[40%] mt-10">
            {activeTab === "DefaultScreen" && <DefaultScreen isDark={isDark} />}
            {activeTab === "LinearEquation" && (
              <LinearEquation isDark={isDark} />
            )}
            {activeTab === "QuadraticEquation" && (
              <QuadraticEquation isDark={isDark} />
            )}
            {activeTab === "SquaredBinomial" && (
              <SquaredBinomial isDark={isDark} />
            )}
            {activeTab === "CubicBinomial" && <CubicBinomial isDark={isDark} />}
            {activeTab === "CustomizedBinomial" && (
              <CustomizedBinomial isDark={isDark} />
            )}
          </section>
        </main>
        <Footer isDark={isDark} />
      </div>
    </>
  );
}

export default App;
