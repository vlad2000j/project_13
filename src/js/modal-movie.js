export { refs };
import { fetchById } from './movies-api-service';
import Notiflix, { Notify } from 'notiflix';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import { fetchTrailer } from './trailer';
import { checkImg } from './movies';
import { displayLoading, hideLoading } from './loading';

const refs = {
  openModal: document.querySelector('.movies__list'),
  closeModalBtn: document.querySelector('.button-close'),
  backdrop: document.querySelector('.backdrop-movie'),
  movieModal: document.querySelector('.modal-movie'),
  movieCard: document.querySelector('.movie-card'),
  body: document.querySelector('[data-page]'),
};

const instance = basicLightbox.create(refs.backdrop, {
  onShow: instance => {},
  onClose: instance => {
    document.querySelector('.backdrop-movie').style.overflowY = 'scroll';
    refs.body.classList.remove('no-scroll');
  },
});

refs.openModal.addEventListener('click', searchIdforMovie);

//Отримуємо данні по id,після надходження даних грузим в модалку

async function searchIdforMovie(e) {
  if (e.target.nodeName === 'LI') {
    const idMovie = e.target.id;
    refs.movieModal.appendChild(displayLoading());
    const response = await fetchById(idMovie);
    hideLoading();
    
    createMarkupMovieCardInModal(response);
  }
  if (
    e.target.nodeName === 'DIV' ||
    e.target.nodeName === 'IMG' ||
    e.target.nodeName === 'H2' ||
    e.target.nodeName === 'P'
  ) {
    const idMovie = e.target.parentElement.id;
    instance.show();
    refs.movieModal.appendChild(displayLoading());
    const response = await fetchById(idMovie);
    hideLoading();
    // берем ID клік idMovie
    createMarkupMovieCardInModal(response);
    refs.closeModalBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', event => closeModalEscape(event));

    if (
      document.querySelector('.header__nav-link.active').textContent === 'Home'
    ) {
      document
        .querySelector(`[data-add="wathced"]`)
        .addEventListener('click', onAddToWatched);

      document
        .querySelector(`[data-add="queue"]`)
        .addEventListener('click', onAddToQueue);
    } else {
      document
        .querySelector(`[data-remove="wathced"]`)
        .addEventListener('click', onRemoveFromWatched);

      document
        .querySelector(`[data-remove="queue"]`)
        .addEventListener('click', onRemoveFromQueue);
    }

    const trailerButton = document.querySelector('.button-open-trailer');

    trailerButton.addEventListener(`click`, clickTrailer);
  }
  refs.body.classList.add('no-scroll');
}

function closeModal() {
  refs.body.classList.remove('no-scroll');
  instance.close(() => refs.body.classList.remove('no-scroll'));
  document.removeEventListener('keydown', event => closeModalEscape(event));
}

function closeModalEscape(event) {
  if (event.key !== 'Escape') {
    return;
  }
  closeModal();
}

function clickTrailer(event) {
  event.preventDefault();

  const filmIdToLS = document.querySelector(`[data-add="wathced"]`).dataset.id;

  fetchTrailer(filmIdToLS).then(data => {
    if (data.data.results.length > 0) {
      window.open(
        `https://www.youtube.com/watch?v=${data.data.results[0].key}`,
        '_blank'
      );
    } else {
      Notify.failure('Sorry, but there is no trailer for this movie');
    }
  });
}

function createMarkupMovieCardInModal({
  poster_path,
  original_title,
  title,
  vote_average,
  vote_count,
  genres,
  overview,
  popularity,
  id,
}) {
  const movieGenres = genres.map(({ name }) => name).join(', ');

  const markup = `<div class="movie-card">
  <div class="movie-card_request">
    <div class="movie-card_img-cover">
      <img
      class="movie-card_photo"
      src="${checkImg(poster_path)}"
      alt="${title}"
    />
      <button type="button" class="button-open-trailer"></button>
    </div>
  </div>
  <div class="movie-description">
    <h2 class="movie-title">${title}</h2>
    <table class="movie-table">
      <tbody>
        <tr class="movie-table_row">
          <td>
            <p class="movie-table_title">Vote/Votes</p>
          </td>
          <td>
            <p>
              <span class= "movie-table_vote"> <span class= "movie-table_vote_aver"> ${vote_average.toFixed(
                1
              )} </span> / ${vote_count}</span>
            </p>
          </td>
        </tr>
        <tr class="movie-table_row">
          <td>
            <p class="movie-table_title">Popularity</p>
          </td>
          <td>
            <p class="movie-table_popularitynum">${popularity}</p>
          </td>
        </tr>
        <tr class="movie-table_row">
          <td>
            <p class="movie-table_title">Original Title</p>
          </td>
          <td>
             <p class="movie-table_title_ori">${original_title}</p>
          </td>
        </tr>
        <tr class="movie-table_row">
          <td>
            <p class="movie-table_title">Genre</p>
          </td>
          <td>
            <p class="movie-table_genrecat">${movieGenres}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="movie-about_container">
    <h3 class="movie-about">About</h3>
    <p class="movie-about_text">${overview}</p>
  </div>
    <ul class="movie-list">
      <li class="movie-item">
        <button type="button" class="movie-item_button" data-id=${id} data-add="wathced">Add to watched</button>
      </li>
      <li class="movie-item">
        <button type="button" class="movie-item_button" data-id=${id} data-add="queue">Add to queue</button>
       </li>
    </ul>
  </div>
</div>`;

  const markupLibrary = `<div class="movie-card">
  <div class="movie-card_request">
    <div class="movie-card_img-cover">
      <img
      class="movie-card_photo"
      src="${checkImg(poster_path)}"
      alt="${title}"
    />
      <button type="button" class="button-open-trailer"></button>
    </div>
  </div>
  <div class="movie-description">
    <h2 class="movie-title">${title}</h2>
    <table class="movie-table">
      <tbody>
        <tr class="movie-table_row">
          <td>
            <p class="movie-table_title">Vote/Votes</p>
          </td>
          <td>
            <p>
              <span class= "movie-table_vote"> <span class= "movie-table_vote_aver"> ${vote_average.toFixed(
                1
              )} </span> / ${vote_count}</span>
            </p>
          </td>
        </tr>
        <tr class="movie-table_row">
          <td>
            <p class="movie-table_title">Popularity</p>
          </td>
          <td>
            <p>${popularity}</p>
          </td>
        </tr>
        <tr class="movie-table_row">
          <td>
            <p class="movie-table_title">Original Title</p>
          </td>
          <td>
             <p class="movie-table_title_ori">${original_title}</p>
          </td>
        </tr>
        <tr class="movie-table_row">
          <td>
            <p class="movie-table_title">Genre</p>
          </td>
          <td>
            <p>${movieGenres}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="movie-about_container">
    <h3 class="movie-about">About</h3>
    <p class="movie-about_text">${overview}</p>
  </div>
    <ul class="movie-list">

            <li class="movie-item">
        <button type="button" class="movie-item_button hover" data-id=${id} data-remove="wathced">Remove from watched</button>
      </li>
      <li class="movie-item">
        <button type="button" class="movie-item_button hover" data-id=${id} data-remove="queue">Remove from queue</button>

       </li>
    </ul>
  </div>
</div>`;

  if (
    document.querySelector('.header__nav-link.active').textContent === 'Home'
  ) {
    refs.movieCard.innerHTML = markup;
  } else {
    refs.movieCard.innerHTML = markupLibrary;
  }
}

function onAddToWatched(e) {
  const filmIdToLS = document.querySelector(`[data-add="wathced"]`).dataset.id;

  const parsedWathcedFilms = JSON.parse(localStorage.getItem('WatchedFilms'));
  if (parsedWathcedFilms === null) {
    Notiflix.Report.success('', 'Film added to WATCHED');
    localStorage.setItem('WatchedFilms', JSON.stringify([filmIdToLS]));
  }

  if (parsedWathcedFilms.includes(filmIdToLS)) {
    Notiflix.Report.failure(
      '',
      'The movie has already been added to the list!'
    );
    return;
  }

  parsedWathcedFilms.push(filmIdToLS);
  Notiflix.Report.success('', 'Film added to WATCHED');
  localStorage.setItem('WatchedFilms', JSON.stringify(parsedWathcedFilms));
}

// Angela Додати це замість onAddToQueue() яка в цьому файлі
function onAddToQueue() {
  const filmIdToLS = document.querySelector(`[data-add="queue"]`).dataset.id;
  const parsedQueueFilms = JSON.parse(localStorage.getItem('QueueFilms'));

  if (parsedQueueFilms.includes(filmIdToLS)) {
    return Notiflix.Report.failure(
      '',
      'The movie has already been added to the queue!'
    );
  } else {
    localStorage.setItem(
      'QueueFilms',
      JSON.stringify([filmIdToLS, ...parsedQueueFilms])
    );
    Notiflix.Report.success('', 'Film added to QUEUE');
  }
}
