import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import "./DetailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import useFetch from "../../../components/hooks/useFetch";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.name);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  useEffect(() => {
    if (video?.key) {
      setVideoId(video.key);
    }
  }, [video]);

  if (loading) {
    return (
      <div className="detailsBannerSkeleton">
        <ContentWrapper>
          <div className="left skeleton"></div>
          <div className="right">
            {Array(7).fill().map((_, i) => (
              <div key={i} className="row skeleton"></div>
            ))}
          </div>
        </ContentWrapper>
      </div>
    );
  }

  return (
    <div className="detailsBanner">
      {!!data && (
        <>
          <div className="backdrop-img">
            <Img src={url.backdrop + data.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>

          <ContentWrapper>
            <div className="content">
              {/* Poster */}
              <div className="left">
                <Img
                  className="posterImg"
                  src={
                    data.poster_path
                      ? url.backdrop + data.poster_path
                      : PosterFallback
                  }
                />
              </div>

              {/* Right Content */}
              <div className="right">
                <div className="title">
                  {`${data.name || data.title} (${dayjs(
                    data.release_date || data.first_air_date
                  ).format("YYYY")})`}
                </div>

                {data.tagline && <div className="subtitle">{data.tagline}</div>}

                {/* Rating and Play Button */}
                <div className="margin_between_overview_and_title">
                  <div className="margin-between">
                    {data.vote_average !== undefined && (
                      <div className="row">
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                      </div>
                    )}

                    {videoId && (
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(videoId);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Overview */}
                {data.overview && (
                  <div className="overview">
                    <div className="heading">Overview</div>
                    <div className="description">{data.overview}</div>
                  </div>
                )}

                {/* Info Rows */}
                <div className="info">
                  {data.status && (
                    <div className="infoItem">
                      <span className="text bold">Status: </span>
                      <span className="text">{data.status}</span>
                    </div>
                  )}

                  {(data.release_date || data.first_air_date) && (
                    <div className="infoItem">
                      <span className="text bold">Release Date: </span>
                      <span className="text">
                        {dayjs(data.release_date || data.first_air_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  )}

                  {data.runtime && (
                    <div className="infoItem">
                      <span className="text bold">Runtime: </span>
                      <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {_genres?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Genres: </span>
                    <span className="text">{_genres.join(", ")}</span>
                  </div>
                )}

                {/* Crew Details */}
                {director?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Director: </span>
                    <span className="text">
                      {director.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {director.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {writer?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Writer: </span>
                    <span className="text">
                      {writer.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {writer.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {data?.created_by?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Creator: </span>
                    <span className="text">
                      {data.created_by.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {data.created_by.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <VideoPopup
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            />
          </ContentWrapper>
        </>
      )}
    </div>
  );
};

DetailsBanner.propTypes = {
  video: PropTypes.object,
  crew: PropTypes.array,
};

export default DetailsBanner;
