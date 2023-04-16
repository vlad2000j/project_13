// !!! імпртувати цей файл в index.js !!!

//     import './js/watched_queue_button';

import QueueService from './queue-service';

const active = 'header-button-active';
const buttons = {
  libraryButton: document.querySelector('[data-action="library"]'),
  watchedButton: document.querySelector('[data-action="watched"]'),
  queueButton: document.querySelector('[data-action="queue"]'),
}

buttons.libraryButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.target.classList.add(active);
  //показати кнопки Queue і Watched
  buttons.queueButton.style.visibility = 'visible';
  buttons.watchedButton.style.visibility = 'visible';
})

//Повертає масив фільмів, що знаходяться в черзі
//наприклад: [{id: 1, title: 'Movie in Queue'},{...}]
buttons.queueButton.addEventListener('click', (event) => {
  event.preventDefault();
  toggleActiveButton(event);
  buttons.watchedButton.classList.remove(active);
  clearMarkup();
  const moviesInQueue = new QueueService().getAllQueue();
  const mappedMovies = markup(moviesInQueue);
  insertMarkup(mappedMovies);
});

//Повертає масив фільмів, що знаходяться в списку переглянутих
//наприклад: [{id: 2, title: 'Watched Movie'},{...}]
buttons.watchedButton.addEventListener('click', (event) => {
  event.preventDefault();
  toggleActiveButton(event);
  buttons.queueButton.classList.remove(active);
  clearMarkup();
  const getWatched = localStorage.getItem('watched');
  const watchedMovies = getWatched ? JSON.parse(getWatched) : [];
  const mappedMovies = markup(watchedMovies);
  return insertMarkup(mappedMovies);
});
 
//Підсвічує кнопку, на яку натиснув користувач
toggleActiveButton = (event) => {
  if (event.target.classList.contains(active))
  event.target.classList.remove(active);
  else
  event.target.classList.add(active);
};


//---------------------------COPIED FRPM movies.js----------------------------------------
const galleryContainer = document.querySelector('#gallery');
export const markup = results => {
 return results
   .map(({ poster_path,
           title,
           id,
           release_date,
           genre_ids,  
      }) => `<li class="movies__card" id="${id}"><img class="movies__card-photo" 
              src="${checkImg(poster_path)}" alt="${title}" loading="lazy" width="395px" height="574px" />
              <h2 class="movies__card-title">${title}</h2>
              <p class="movies__card-genres">${genre_ids.join(', ')} | ${dotaReleaseCheck(release_date)}</p>
            </li>`).join('');
};

// Провірка дати реліза
const dotaReleaseCheck = value =>`${!value ? 'Unknown' : `${value.slice(0, 4)}`}`;
// Перевірка фото
const checkImg = url =>`${!url ? `https://img.freepik.com/premium-vector/video-production-logo-fun-modern-black_434503-786.jpg?w=1060`
      : `https://image.tmdb.org/t/p/w500${url}`
  }`;

// Функція очистки галереї
export const clearMarkup = () => {
   galleryContainer.innerHTML = '';
};
// Функція вімалювання галереї
export const insertMarkup = markup => {
  return galleryContainer.insertAdjacentHTML('beforeend', markup);
};
//-------------------------------------------------------------------

//TODO: прибрати після повної імплементації addWatchedFilm цю функцію. 
// Існує лише для демонстрації, поки дані не зберігаються в локал сторедж!!!
init = () => {
  const myQueue = new QueueService();
  myQueue.setQueue({ id: 1, title: 'The Last Kingdom: Seven Kings Must Die', poster_path: '/xUvSeFhdsJbKFOaHnB9TeTZpJKs.jpg', release_date: null, genre_ids: [] });
  myQueue.setQueue({ id: 2, title: '65', poster_path: '/rzRb63TldOKdKydCvWJM8B6EkPM.jpg', release_date: null, genre_ids: [] });
  myQueue.setQueue({ id: 3, title: 'John Wick: Chapter 4', poster_path: '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', release_date: null, genre_ids: [] });
  localStorage.setItem('watched', JSON.stringify([
    { id: 4, title: 'Shazam! Fury of the Gods', poster_path: '/3GrRgt6CiLIUXUtoktcv1g2iwT5.jpg', release_date: null, genre_ids: [] },
    { id: 5, title: 'Avatar: The Way of Water', poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', release_date: null, genre_ids: [] }
  ]))
};

init();