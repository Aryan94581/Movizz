import { useParams } from "react-router-dom";
import useFetch from "../../components/hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideoSection";
import Similar from "./Similar";
import Recommendation from "./Recommendations";

const Details = () => {
    const { mediaType, id } = useParams();
    
    // Fetching details, videos, and credits dynamically
    const { data: videoData, loading: videoLoading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: creditsData, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

    return (
        <div>
            <DetailsBanner video={videoData?.results?.[0]} crew={creditsData?.crew} />
            <Cast data={creditsData?.cast} loading={creditsLoading} />
            <VideosSection data={videoData} loading={videoLoading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;
