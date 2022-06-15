export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const api_key = `e483b9304fcb8fba2b24ea288e2deae5`;
const tmdbEndPoint = "https://api.themoviedb.org/3/movie";
const tmdbEndPointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndPoint}/${type}?api_key=${api_key}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndPoint}/${movieId}?api_key=${api_key}`,
  getMovieMeta: (movieId, meta) =>
    `${tmdbEndPoint}/${movieId}/${meta}?api_key=${api_key}`,
  getFillterDebounce: (query, page) =>
    `${tmdbEndPointSearch}?api_key=${api_key}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  videoTrailer: (url) => `https://www.youtube.com/embed/${url}`,
};
