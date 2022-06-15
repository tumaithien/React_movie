import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config/config";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "components/loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const { title, release_date, vote_average, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={tmdbAPI.image500(poster_path)}
        alt={title}
        className="w-full h-[500px] object-cover rounded-lg mb-3"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm mb-10 opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)} bgColor="secondary">
          Watch Now
        </Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    // shape chỉ đến Object có nhiều object bên trong
    title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this components
    </p>
  );
}
export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <LoadingSkeleton
        width="100%"
        height="500px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>

        <div className="flex items-center justify-between text-sm mb-10 opacity-50">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          width="100%"
          height="40px"
          radius="6px"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};
