import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getGeners } from "./store/homeSlice";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/details";
import SearchResult from "./pages/searchResult/searchResult";
import PageNotFound from "./pages/404/pageNotFound";
import Explore from "./pages/explore/explore";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    fetchGenres();
  }, []);

  const fetchApiConfig = async () => {
    try {
      const res = await fetchDataFromApi("/configuration");
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    } catch (error) {
      console.error("Error fetching API config:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const endpoints = ["tv", "movie"];
      const promises = endpoints.map((type) =>
        fetchDataFromApi(`/genre/${type}/list`)
      );
      const results = await Promise.all(promises);

      const allGenres = {};
      results.forEach(({ genres }) => {
        genres.forEach((item) => {
          allGenres[item.id] = item;
        });
      });

      dispatch(getGeners(allGenres));
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
