import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.scss";
import useFetch from "../../components/hooks/useFetch";
import ContentWrapper from "../../components/contentWrapper/contentWrapper";
import PosterFallback from "../../assets/no-poster.png";
import Img from "../../components/lazyLoadImage/img";

const SearchResult = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, loading } = useFetch(`/search/multi?query=${query}&page=${page}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <div className="searchResultsPage">
      <ContentWrapper>
        {!loading ? (
          data?.results?.length ? (
            <div className="resultsGrid">
              {data.results.map((item) => {
                if (item.media_type === "person") return null;

                const posterUrl = item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : PosterFallback;

                return (
                  <div
                    className="card"
                    key={`${item.id}_${item.media_type}`}
                    onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                  >
                    <Img src={posterUrl} alt={item.title || item.name} />
                    <div className="title">{item.title || item.name}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="noResults">No results found for {query}.</div>
          )
        ) : (
          <div className="loading">Loading...</div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default SearchResult;
