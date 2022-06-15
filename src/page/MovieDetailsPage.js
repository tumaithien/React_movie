/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config/config";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <>
      <div className="py-10">
        <div className="w-full h-[800px] relative">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
          <div
            className="w-full h-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
            }}
          ></div>
        </div>
        <div className="w-full h-[500px] max-w-[800px] mx-auto -mt-[250px] relative z-10 pb-10">
          <img
            src={tmdbAPI.imageOriginal(poster_path)}
            className="w-full h-full object-cover rounded-md"
            alt=""
          />
        </div>
        <h1 className="text-center text-white text-4xl font-bold mb-10">
          {title}
        </h1>
        <div className="flex items-center gap-x-5 mb-10 justify-center">
          {genres.length > 0 &&
            genres.map((item) => (
              <span
                className="py-2 px-4 border border-primary text-primary rounded"
                key={item.id}
              >
                {item.name}
              </span>
            ))}
        </div>
        <p className="text-center text-md  leading-relaxed max-w-[600px] mx-auto mb-10">
          {overview}
        </p>
        <MovieMeta type="credits"></MovieMeta>
        <MovieMeta type="videos"></MovieMeta>
        <MovieMeta type="similar"></MovieMeta>
      </div>
    </>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="text-3xl text-center font-bold uppercase mb-10">
          Casts
        </h2>
        <div className="grid grid-cols-4 gap-x-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                className="w-full h-[350px] object-cover rounded-md mb-3"
                alt={item.name}
              />
              <h3 className="text-xl font-medium text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results && results.length <= 0) return null;
    if (type === "videos") {
      return (
        <div className="py-10">
          <h3 className="text-3xl text-center mb-10 uppercase font-bold">
            Trailer Movie
          </h3>
          {results.slice(0, 1).map((item) => (
            <div key={item.id}>
              <iframe
                width={1280}
                height={640}
                src={tmdbAPI.videoTrailer(item.key)}
                title={item.name}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mx-auto"
              />
            </div>
          ))}
        </div>
      );
    }
    if (type === "similar") {
      return (
        <div>
          <h2 className="text-3xl font-medium mb-10">Similar Movie</h2>
          <div className="movie-list">
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={4}>
              {results.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      );
    }
    return null;
  }
}

// function MovieCredit() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast || cast.length <= 0) return null;
//   return (
//     <div className="py-10">
//       <h2 className="text-3xl text-center font-bold uppercase mb-10">Casts</h2>
//       <div className="grid grid-cols-4 gap-x-5">
//         {cast.slice(0, 4).map((item) => (
//           <div className="cast-item" key={item.id}>
//             <img
//               src={tmdbAPI.imageOriginal(item.profile_path)}
//               className="w-full h-[350px] object-cover rounded-md mb-3"
//               alt={item.name}
//             />
//             <h3 className="text-xl font-medium text-center">{item.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MovieVideo() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
//   const trailerMovie = data?.results || [];

//   return (
//     <div className="py-10">
//       <h3 className="text-3xl text-center mb-10 uppercase font-bold">
//         Trailer Movie
//       </h3>
//       {trailerMovie.length > 0 &&
//         trailerMovie.slice(0, 1).map((item) => (
//           <div key={item.id}>
//             <iframe
//               width={1280}
//               height={640}
//               src={tmdbAPI.videoTrailer(item.key)}
//               title={item.name}
//               frameBorder={0}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="mx-auto"
//             />
//           </div>
//         ))}
//     </div>
//   );
// }

// function MovieSimilar() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
//   const movieSimilar = data?.results || [];
//   console.log("movieSimilar", movieSimilar);
//   return (
//     <div>
//       <h2 className="text-3xl font-medium mb-10">Similar Movie</h2>
//       <div className="movie-list">
//         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={4}>
//           {movieSimilar.length > 0 &&
//             movieSimilar.map((item) => {
//               return (
//                 <SwiperSlide key={item.id}>
//                   <MovieCard item={item}></MovieCard>
//                 </SwiperSlide>
//               );
//             })}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

export default MovieDetailsPage;
