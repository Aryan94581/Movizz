import "./style.scss";
import HeroBanner from "./heroBanner/heroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
const home = () => {
  return <div className="homePage">
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
      <div style={{height:500}}>
      </div>
    </div>

};

export default home;
