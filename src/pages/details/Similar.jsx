import PropTypes from "prop-types";
import Carousel from "../../components/carousel/Carousel";
import useFetch from "../../components/hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

    return (
        <Carousel
            title="Similar Movies/TV Shows"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

Similar.propTypes = {
    mediaType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired, // id should be a string
};

export default Similar;
