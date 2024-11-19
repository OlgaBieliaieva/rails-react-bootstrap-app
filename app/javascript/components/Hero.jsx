import React from "react";
import { AddButton } from "./Buttons";

const Hero = () => (
  <div className="w-75 py-5 d-flex flex-column align-items-center justify-content-center gap-4">
    <h1 className="text-light text-center text-capitalize" style={{fontSize: 56}}>Improve your culinary talents</h1>
    <p className="text-light text-center fs-4">
      Amazing recipes for beginners in the world of cooking, enveloping you in
      the aromas and tastes of various cuisines.
    </p>
    <AddButton text="Add recipe" />
  </div>
);
export default Hero;
