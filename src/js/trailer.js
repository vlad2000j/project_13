import axios from 'axios';
export { fetchTrailer, clickTrailer };

let idTrailer;

const API_KEY = `2ac41627e60ee28ce7ee19eda978da51`;
const base_url = `https://api.themoviedb.org/3/movie/`;

const fetchTrailer = async id => {
  return axios.get(`${base_url}${id}/videos?api_key=${API_KEY}&language=en-US`);
};
