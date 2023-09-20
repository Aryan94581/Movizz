import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/heroBanner";
import Trending from "./trending/Trending";

HeroBanner;
const home = () => {
  return <div className="homePage">
      <HeroBanner/>
      <Trending/>
      <div style={{height:1000}}>

      </div>
    </div>

};

export default home;
