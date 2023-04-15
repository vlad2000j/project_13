import axios from 'axios';
export { getPopularMovies, getGanres, BASE_URL, API_KEY, fetchById, onKeyWord };
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '2ac41627e60ee28ce7ee19eda978da51';
const getPopularMovies = async page => {
  return await axios.get(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
};
//Запит на масив жанрів
const getGanres = async () => {
  return await axios.get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`);
};
// Запит на пошук даних фільмів ID
async function fetchById(id) {
  const responce = await fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);
  const data = await responce.json();
  return data;
}

const onKeyWord = async (searchQuery, page) => {
  return await axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
  );
};
