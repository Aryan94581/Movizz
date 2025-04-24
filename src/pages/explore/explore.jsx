import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ContentWrapper from "../../components/contentWrapper/contentWrapper";
import useFetch from "../../components/hooks/useFetch";
import Img from "../../components/lazyLoadImage/img";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss"; // create this file for styling
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const { mediaType } = useParams(); // movie or tv
  const [endpoint, setEndpoint] = useState(mediaType);
  const { data, loading } = useFetch(`/discover/${endpoint}`);
  const navigate = useNavigate();

  useEffect(() => {
    setEndpoint(mediaType);
  }, [mediaType]);

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="exploreGrid">
          {!loading && data?.results?.length > 0 ? (
            data.results.map((item) => {
              const posterUrl = item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : PosterFallback;
              return (
                <div
                  className="exploreCard"
                  key={item.id}
                  onClick={() => navigate(`/${mediaType}/${item.id}`)}
                >
                  <Img src={posterUrl} />
                  <div className="title">{item.title || item.name}</div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Explore;
