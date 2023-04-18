import QueueService from './js/queue-service';
userQueue = new QueueService();
const AddQueueBtn = document.querySelector('[data-add="queue"]');
AddQueueBtn.addEventListener('click', AddQueue);

function AddQueue() {
  userQueue.setQueue();
}
