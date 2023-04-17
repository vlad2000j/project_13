import axios from 'axios';
import { API_KEY } from './vars';

export { downloadPopMainPage };
  
const BASE_URL = 'https://api.themoviedb.org/3/';

const getPopularMovies = async page => {
  return await axios.get(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
};
