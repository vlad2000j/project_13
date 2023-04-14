import {
  getPopularMovies,
  getGanres,
  onKeyWord,
} from '../js/api/movies-api.js';
import Notiflix from 'notiflix';

export {
  galleryConteiner,
  createMoviesMarkup,
  createMoviesMarkupKey,
  dotaReleaseCheck,
  checkImg,
};

const galleryConteiner = document.querySelector('.movies__list');
let page = 1;
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
    markup(results);

    return;
  }
}
getPopularMovies(page)
  .then(({ data }) => {
    createMoviesMarkup(page);
    const totalRes = data.total_results;
    createPagi(totalRes);
  })
  .catch(error => console.log(error));

async function createMoviesMarkupKey(searchQuery, page) {
  const response = await onKeyWord(searchQuery, page);
  const results = response.data.results;
  const arrGenerId = response.data.results.map(item => item.genre_ids);

  const genreResponse = await getGanres();
  const arrGener = genreResponse.data.genres;

  replaceIdtoGener(arrGener, arrGenerId);

  markup(results);
}

// Ці функції можна винести в окремий модуль js
const markup = results => {
  const markup = results
    .map(
      ({
        poster_path,
        title,
        id,
        release_date,
        genre_ids,
      }) => `<li class="movies__card" id="${id}">
    <img
      class="movies__card-photo"
      src="${checkImg(poster_path)}"
      alt="${title}"
      loading="lazy"
      width="395px"
      height="354px"
    />
    <h2 class="movies__card-title">${title}</h2>
    <p class="movies__card-genres">${genre_ids.join(', ')} | ${dotaReleaseCheck(
        release_date
      )}</p>
  </li>`
    )
    .join('');
  return galleryConteiner.insertAdjacentHTML('beforeend', markup);
};

// Функція очистки галереї

const clearMarkup = () => {
  galleryConteiner.innerHTML = '';
};

// Фінкції перевірки надходж. значень

// Перевірка дати реліза
const dotaReleaseCheck = value =>
  `${!value ? 'Unknown' : `${value.slice(0, 4)}`}`;

//Перевірка  фото
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
