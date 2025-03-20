import "./App.css";
import { useState } from "react";
import Header from "../components/Header.jsx";
import Equation from "../components/Equation.jsx";
import DefaultScreen from "../components/formulas/DefaultScreen.jsx";
import LinearEquation from "../components/formulas/linearEquation.jsx";
import QuadraticEquation from "../components/formulas/QuadraticEquation.jsx";
import SquaredBinomial from "../components/formulas/SquaredBinomial.jsx";
import CubicBinomial from "../components/formulas/CubicBinomial.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("DefaultScreen");

  return (
    <>
      <div className="bg-[#f0f0f0] min-h-[100vh]">
        {/* <div className="bg-[red] min-h-[100vh]"> */}
        <Header />
        <main className="main-container flex items-start px-2">
          <section className="equations w-[60%]">
            <h1 className="text-3xl font-bold ml-3">Equations:</h1>
            <Equation
              clickHandler={() => setActiveTab("LinearEquation")}
              equationType="Solve linear equation"
              equation={<span>ax + b = 0</span>}
            />
            <Equation
              clickHandler={() => setActiveTab("QuadraticEquation")}
              equationType="Solve quadratic equation"
              equation={
                <span>
                  ax<sup>2</sup> + bx + c = 0
                </span>
              }
            />
            <h1 className="text-3xl font-bold ml-3 mt-4">Expressions:</h1>
            <Equation
              clickHandler={() => setActiveTab("SquaredBinomial")}
              equationType="Solve squared binomial"
              equation={
                <span>
                  (a + b)<sup>2</sup>
                </span>
              }
            />
            <Equation
              clickHandler={() => setActiveTab("CubicBinomial")}
              equationType="Solve cubic binomial"
              equation={
                <span>
                  (a + b)<sup>3</sup>
                </span>
              }
            />
          </section>
          <section className="solver w-[40%] mt-10">
            {activeTab === "DefaultScreen" && <DefaultScreen />}
            {activeTab === "LinearEquation" && <LinearEquation />}
            {activeTab === "QuadraticEquation" && <QuadraticEquation />}
            {activeTab === "SquaredBinomial" && <SquaredBinomial />}
            {activeTab === "CubicBinomial" && <CubicBinomial />}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
