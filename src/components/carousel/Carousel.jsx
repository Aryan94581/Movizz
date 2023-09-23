
import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

import ContentWrapper from "../../components/contentWrapper/contentWrapper";
import Img from "../lazyLoadImage/img";
import PosterFallback from "../../assets/no-poster.png";
import "./Carousel.scss";
const Carousel = ({ data, loading }) => {

    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {

    }

    const skItem = () =>{
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }


    return <div className="carousel">
        <ContentWrapper>
            <BsFillArrowLeftCircleFill
                className="carouselLeftNav arrow"
                onClick={() => navigation("left")}
            />
            <BsFillArrowRightCircleFill
                className="carouselRightNav arrow"
                onClick={() => navigation("right")}
            />
            {!loading ? (
                <div className="carouselItems">
                    {data?.map((item) => {

                        const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;

                        return (
                            <div className="carouselItem" key={item.id}>
                                <div className="posterBlock">
                                    <Img src={posterUrl} />
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {
                                            item.title || item.name
                                        }
                                    </span>
                                    <span className="date">
                                        {
                                            dayjs(item.release_date).format(
                                                "DD MM YYYY"
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="loadingSkeleton">
                    {(skItem)}
                    {(skItem)}
                    {(skItem)}
                    {(skItem)}
                    {(skItem)}
                </div>
            )}
        </ContentWrapper>
    </div>

}

export default Carousel