import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGRmMGJhMTg1Mjg2NTA0NmRkOTBkZjRlZGQwZDMxYyIsInN1YiI6IjY0Zjc1ZjVhZTBjYTdmMDE0ZjZjZWVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L4jH7Jl3tV6E2VvviHKL_rNdbcdWQc1uPxDEYbbZRws";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
