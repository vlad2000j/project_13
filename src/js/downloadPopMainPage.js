<<<<<<< Updated upstream
=======

import axios from "axios";
// import { pathParams } from "./vars";

const pathParams = {
  API_KEY:  '2ac41627e60ee28ce7ee19eda978da51',
  BASE_URL: 'https://api.themoviedb.org/3/',
  media_type: 'movie',
  time_window: 'week',

}

const getPopularMovies = async page => {
  return await axios.get(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
};
// import './js/downloadPopMainPage';
>>>>>>> Stashed changes
