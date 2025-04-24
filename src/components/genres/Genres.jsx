import PropTypes from "prop-types"; // ✅ Add this import
import { useSelector } from "react-redux";
import "./Genres.scss";

const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);

    return (
        <div className="genres">
            {data?.map((g) => {
                if (!genres[g]?.name) return null;
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

// ✅ Add PropTypes validation
Genres.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Genres;
