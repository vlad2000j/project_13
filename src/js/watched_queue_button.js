// !!! імпртувати цей файл в index.js !!!
//     import './js/watched_queue_button';

import QueueService from './queue-service';

const buttons = {
  watchedButton: document.querySelector('[data-action="watched"]'),
  queueButton: document.querySelector('[data-action="queue"]'),
}

//Повертає масив фільмів, що знаходяться в черзі
//наприклад: [{id: 1, title: 'Movie in Queue'},{...}]
buttons.queueButton.addEventListener('click', (event) => {
  event.preventDefault();
  const queueService = new QueueService();
  return queueService.getAllQueue();
});

//Повертає масив фільмів, що знаходяться в списку переглянутих
//наприклад: [{id: 2, title: 'Watched Movie'},{...}]
buttons.watchedButton.addEventListener('click', (event) => {
  event.preventDefault();
  const getWatched = localStorage.getItem('watched');
  return getWatched ? JSON.parse(getWatched) : [];
 });