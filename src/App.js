import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import "swiper/scss";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
// import HomePage from "./page/HomePage";
// import MovieDetailsPage from "./page/MovieDetailsPage";
// import MoviePage from "./page/MoviePage";

//https://api.themoviedb.org/3/movie/550?api_key=e483b9304fcb8fba2b24ea288e2deae5

const HomePage = lazy(() => import("./page/HomePage")); // lazyload component (dynamic import)
const MovieDetailsPage = lazy(() => import("./page/MovieDetailsPage"));
const MoviePageLoadMore = lazy(() => import("./page/MoviePageLoadMore"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <Fragment>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </Fragment>
              }
            ></Route>
            <Route
              path="/movie"
              element={<MoviePageLoadMore></MoviePageLoadMore>}
            ></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
