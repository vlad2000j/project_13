import './js/vars';
import QueueService from './js/queue-service';

//Створюємо об'єкт

myQueue = new QueueService();

// myQueue.removeQueue(); // Очищуємо чергу
myQueue.setQueue({ id: 123, title: 'More' }); // Додаємо дані фільму в чергу
myQueue.setQueue({ id: 124, title: 'More' }); // Додаємо дані фільму в чергу
myQueue.removeFromQueue(123); // Видаляємо фільм з черги за id
myQueue.removeFromQueue(124); // Видаляємо фільм з черги за id
myQueue.setQueue({ id: 234, title: 'Іndiana Johnes' }); // Додаємо дані фільму в чергу
