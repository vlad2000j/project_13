//приклад використання

// Імпортуємо в index.js

// import QueueService from './js/queue-service';

// Створюємо об'єкт

// myQueue = new QueueService();

// myQueue.removeQueue(); // Очищуємо чергу
// myQueue.setQueue({ id: 123, title: 'More' }); // Додаємо дані фільму в чергу
// myQueue.setQueue({ id: 124, title: 'More' }); // Додаємо дані фільму в чергу
// myQueue.removeFromQueue(123); // Видаляємо фільм з черги за id
// myQueue.removeFromQueue(124); // Видаляємо фільм з черги за id
// myQueue.setQueue({ id: 234, title: 'Іndiana Johnes' }); // Додаємо дані фільму в чергу
// console.log(myQueue.getQueueById(235)); // Виводить в косоль за id
// myQueue.removeFirstItemFromQueue(); // Видаляє перший елемент з черги
// console.log(myQueue.getFirstItemFromQueue()); // Показує перший елемент в черзі

// ------------------- Реалізація класу QueueService --------------------------

QUEUE = 'QueueFilms';
export default class QueueService {
  getAllQueue() {
    if (localStorage.getItem(QUEUE)) {
      return JSON.parse(localStorage.getItem(QUEUE));
    }
  }

  setQueue(movie) {
    if (localStorage.getItem(QUEUE)) {
      // Читаємо з localStorage d movie
      const movies = this.getAllQueue();
      //Перевіряємо, чи є вже такий об'єкт в черзі
      if (!movies.some(obj => obj.id === movie.id)) {
        // Додаємо об'єкт до масиву movies
        movies.push(movie);
        // Додаємо оновлений масив до localStorage
        localStorage.setItem(QUEUE, JSON.stringify(movies));
      }
    } else {
      localStorage.setItem(QUEUE, JSON.stringify([movie]));
    }
  }

  getQueueById(id) {
    if (localStorage.getItem(QUEUE)) {
      return this.getAllQueue().filter(e => e.id === id)[0];
    }
  }

  getFirstItemFromQueue() {
    return this.getAllQueue()[0];
  }

  removeFirstItemFromQueue() {
    if (localStorage.getItem(QUEUE)) {
      this.removeFromQueue(this.getFirstItemFromQueue().id);
    }
  }

  removeFromQueue(id) {
    if (localStorage.getItem(QUEUE)) {
      const newMovies = this.getAllQueue().filter(obj => obj.id !== id);
      localStorage.setItem(QUEUE, JSON.stringify(newMovies));
    }
  }

  removeQueue() {
    localStorage.removeItem(QUEUE);
  }
}
