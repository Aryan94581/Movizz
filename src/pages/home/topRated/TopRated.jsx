import { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../components/hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
import { useNavigate } from 'react-router-dom';

const TopRated = () => {
    const [endPoint, setEndPoint] = useState("movie");
    const { data, loading } = useFetch(`/${endPoint}/top_rated`);
    const navigate = useNavigate();

    const onTabChange = (tab) => {
        setEndPoint(tab === "Movies" ? "movie" : "tv");
    };

    const handleCardClick = (id) => {
        // Redirect to the correct detail page
        navigate(`/${endPoint}/${id}`);
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">
                    Top Rated
                </span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} onCardClick={handleCardClick} />
        </div>
    );
};

export default TopRated;
