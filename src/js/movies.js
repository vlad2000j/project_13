import { createPage } from './pagination_main';
import {
  getPopularMovies,
  getGanres,
  onKeyWord,
} from './movies-api-service.js';
import Notiflix from 'notiflix';
import { displayLoading, hideLoading } from './loading';
// import { createPagi } from './pagination_main.js';

const galleryConteiner = document.querySelector('.movies__list');
let page = 1;

export {
  galleryConteiner,
  createMoviesMarkup,
  createMoviesMarkupKey,
  dotaReleaseCheck,
  checkImg,
};

async function createMoviesMarkup(page) {
  if (
    document.querySelector('.header__nav-link.active').textContent === 'Home'
  ) {
    const response = await getPopularMovies(page);

    const results = response.data.results;
    const arrGenerId = response.data.results.map(item => item.genre_ids);

    const genreResponse = await getGanres();
    const arrGener = genreResponse.data.genres;

    replaceIdtoGener(arrGener, arrGenerId);
    const mappedMovies = markup(results);
    insertMarkup(mappedMovies);

    return;
  }
}
galleryConteiner.appendChild(displayLoading());
getPopularMovies(page)
  .then(({ data }) => {
    createMoviesMarkup(page);
    hideLoading();
    const totalRes = data.total_results;
    createPage(totalRes);
  })
  .catch(error => console.log(error));

async function createMoviesMarkupKey(searchQuery, page) {
  const response = await onKeyWord(searchQuery, page);
  const results = response.data.results;
  const arrGenerId = response.data.results.map(item => item.genre_ids);

  const genreResponse = await getGanres();
  const arrGener = genreResponse.data.genres;

  replaceIdtoGener(arrGener, arrGenerId);

  const mappedMovies = markup(results);
  insertMarkup(mappedMovies);
}

// Ці функції можна вивести в окремий модуль js
export const markup = results => {
  return results
    .map(({ poster_path, title, id, release_date, genre_ids }) => {
      const genres = genre_ids ? genre_ids.join(', ') : '';
      return `<li class="movies__card" id="${id}">
    <img
      class="movies__card-photo"
      src="${checkImg(poster_path)}"
      alt="${title}"
      loading="lazy"
      width="395px"
      height="574px"
    />
    <h2 class="movies__card-title">${title}</h2>
    <p class="movies__card-genres">${genres} | ${dotaReleaseCheck(
        release_date
      )}</p>
  </li>`;
    })
    .join('');
};

// Функція очистки галереї
export const clearMarkup = () => {
  galleryConteiner.innerHTML = '';
};

// Функція вімалювання галереї
export const insertMarkup = markup => {
  return galleryConteiner.insertAdjacentHTML('beforeend', markup);
};

// функцшї перевірки даних що надходять в запросі

// Провірка дати реліза
const dotaReleaseCheck = value =>
  `${!value ? 'Unknown' : `${value.slice(0, 4)}`}`;

// Перевірка фото
const checkImg = url =>
  `${
    !url
      ? `https://img.freepik.com/premium-vector/video-production-logo-fun-modern-black_434503-786.jpg?w=1060`
      : `https://image.tmdb.org/t/p/w500${url}`
  }`;
// функція для заміни ID  на назву

function replaceIdtoGener(arrGener, arrGenerId) {
  arrGenerId.forEach(item => {
    for (let i = 0; i < item.length; i += 1) {
      for (let j = 0; j < arrGener.length; j += 1) {
        item[i] === arrGener[j].id ? (item[i] = arrGener[j].name) : item[i];
      }
    }
  });
}
