import axios from 'axios';
import API_KEY from './vars';
import genres from './genres';

const BASE_URL = 'https://api.themoviedb.org/3';
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  async getMoviesData() {
    const config = {
      method: 'get',
      url: `${BASE_URL}/search/movie`,
      responseType: 'json',
      params: {
        api_key: API_KEY,
        query: this.searchQuery,
        page: this.page,
      },
    };

    try {
      const response = await axios(config);

      const movies = [];
      for (const obj of response.data.results) {
        const {
          genre_ids,
          title,
          poster_path,
          release_date,
          backdrop_path,
          overview,
          popularity,
          original_title,
          vote_average,
          vote_count,
        } = obj;
        const poster_url = `https://image.tmdb.org/t/p/original/${poster_path}`;
        const genres_names = getGenresByIds(genres, genre_ids);
        const release_year = release_date.slice(0, 4);
        const new_obj = {
          genres_names,
          title,
          poster_url,
          release_year,
          backdrop_path,
          overview,
          popularity,
          original_title,
          vote_average,
          vote_count,
        };
        movies.push(new_obj);
      }
      const data = {
        page: response.data.page,
        movies,
      };
      return data;
    } catch {
      console.log('Sonething wrong');
      return;
    }
  }
}
// ----------------------------------------------------------------------------
// Метод getMoviesData() вповертає об'єкт з наступними полями
// genres_names --- масив з переліком жанрів (для картки)
// title --- назва фільму
// poster_url --- адреса для постера
// release_year --- рік виходу фільму
// backdrop_pat --- беудроп для модалки
// overvie --- опис фільму (для модалки)
// popularity --- популярність (для модалки)
// original_title --- оришінальна назва (для модалки)
// vote_average --- середній рейтинг (для модалки)
// vote_count --- кількість голосів (для модалки)

// Функція для перетворення масиву ids жанрів в масив імен жанрів
function getGenresByIds(genres, ids) {
  return genres
    .filter(genre => ids.includes(genre.id))
    .map(genre => genre.name);
}
