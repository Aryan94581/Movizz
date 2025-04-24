import PropTypes from "prop-types";
import Carousel from "../../components/carousel/Carousel";
import useFetch from "../../components/hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

Recommendation.propTypes = {
    mediaType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired, // id should be a string
};

export default Recommendation;
