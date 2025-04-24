import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ContentWrapper from "../../components/contentWrapper/contentWrapper"
import useFetch from "../../components/hooks/useFetch";
import Carousel from "../../components/carousel/Carousel";

const Explore = () => {
  const { mediaType } = useParams(); // movie or tv
  const [endpoint, setEndpoint] = useState(mediaType);
  const { data, loading } = useFetch(`/discover/${endpoint}`);

  useEffect(() => {
    setEndpoint(mediaType); // update if user switches between /explore/movie and /explore/tv
  }, [mediaType]);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Explore {mediaType === "movie" ? "Movies" : "TV Shows"}</span>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Explore;
