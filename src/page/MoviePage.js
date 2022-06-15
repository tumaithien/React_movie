import React from "react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config/config";
import useDebounce from "../hook/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
//https://api.themoviedb.org/3/search/movie?api_key=

// const pageCount = 5;
const itemsPerPage = 20;
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [fillter, setFillter] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const fillterDebounce = useDebounce(fillter, 500);
  const handleFillter = (e) => {
    setFillter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const { total_results } = data || [];
  useEffect(() => {
    if (fillterDebounce) {
      setUrl(tmdbAPI.getFillterDebounce(fillterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [fillterDebounce, nextPage, fillter]);
  const movies = data?.results || [];
  useEffect(() => {
    if (!data || !total_results) return;
    setPageCount(Math.ceil(total_results / itemsPerPage));
  }, [data, itemOffset, total_results]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <div className="py-10 page-container-fluid">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search..."
            onChange={handleFillter}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div className="h-10 w-10 mx-auto border-4 border-primary border-t-transparent border-t-4 animate-spin rounded-full"></div>
      )} */}
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => {
            return <MovieCard key={item.id} item={item}></MovieCard>;
          })}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination-custom"
        />
      </div>
      {/* <div className="flex items-center justify-center mt-10 gap-x-5 hidden">
        <span
          className="cursor-pointer"
          onClick={() => {
            if (nextPage === 1) {
              setNextPage(1);
            } else setNextPage(nextPage - 1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </span>
        {new Array(pageCount).fill(0).map((item, index) => (
          <span
            key={index}
            className="cursor-pointer inline-block py-2 px-4 rounded-md leading-none bg-secondary"
            onClick={() => setNextPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <span
          className="cursor-pointer"
          onClick={() => setNextPage(nextPage + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div> */}
    </div>
  );
};

export default MoviePage;
