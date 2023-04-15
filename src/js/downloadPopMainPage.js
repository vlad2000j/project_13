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

export default async function downloadPopMainPage(page) {
  const { BASE_URL, API_KEY, media_type, time_window} = pathParams;
  try {
    const response = await
          axios.get(`${BASE_URL}/trending/${media_type}/${time_window}?api_key=${API_KEY}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    }
};
// import './js/downloadPopMainPage';
>>>>>>> Stashed changes
