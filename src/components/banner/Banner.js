import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config/config";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import LoadingSkeleton from "components/loading/LoadingSkeleton";

const Banner = () => {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=e483b9304fcb8fba2b24ea288e2deae5`,
    fetcher
  );
  const { data: tagData } = useSWR(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=e483b9304fcb8fba2b24ea288e2deae5`,
    fetcher
  );
  const moviesBanner = data?.results || [];
  const moviesTag = tagData?.genres || [];
  const isLoading = !data && !error;
  const moviesTagObject = {};
  //Change Array Tag to Object
  moviesTag.forEach((tagItem) => {
    const key = tagItem.id;
    moviesTagObject[key] = tagItem;
    moviesTagObject[key] = {
      id: tagItem.id,
      name: tagItem.name,
    };
  });
  return (
    <section className="banner h-[600px] page-container-fluid mb-20 overflow-hidden">
      {isLoading ? (
        <BannerItemSkeleton></BannerItemSkeleton>
      ) : (
        <Swiper
          grabCursor={"true"}
          slidesPerView={"auto"}
          effect={"fade"}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
        >
          {moviesBanner.length > 0 &&
            moviesBanner.map((item) => (
              <SwiperSlide key={item.id}>
                <BannerItem
                  item={item}
                  moviesTagObject={moviesTagObject}
                ></BannerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </section>
  );
};

function BannerItem({ item, moviesTagObject }) {
  const { poster_path, title, genre_ids, id } = item;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={title}
        className="w-full h-full object-cover object-top rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className=" font-bold text-5xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          {genre_ids.length > 0 &&
            genre_ids.map((dataId) => {
              const tag = moviesTagObject[dataId];
              if (!tag) return null;
              return (
                <span
                  key={tag.id}
                  className="py-2 px-4 border border-white rounded-md text-sm"
                >
                  {tag.name}
                </span>
              );
            })}
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)} bgColor="primary">
          Watch Now
        </Button>
      </div>
    </div>
  );
}
function BannerItemSkeleton() {
  return (
    <>
      <div className="w-full h-full rounded-lg relative">
        <LoadingSkeleton
          height="100%"
          width="100%"
          radius="8px"
        ></LoadingSkeleton>
        <div className="absolute left-5 bottom-5 w-full text-white">
          <h2 className=" font-bold text-5xl mb-5">
            <LoadingSkeleton
              width="100%"
              height="40px"
              radius="6px"
            ></LoadingSkeleton>
          </h2>
          <div className="flex items-center gap-x-3 mb-8">
            <LoadingSkeleton
              width="50px"
              height="30px"
              radius="6px"
            ></LoadingSkeleton>
            <LoadingSkeleton
              width="50px"
              height="30px"
              radius="6px"
            ></LoadingSkeleton>
            <LoadingSkeleton
              width="50px"
              height="30px"
              radius="6px"
            ></LoadingSkeleton>
          </div>
          <LoadingSkeleton
            width="100px"
            height="40px"
            radius="6px"
          ></LoadingSkeleton>
        </div>
      </div>
      ;
    </>
  );
}
export default Banner;
