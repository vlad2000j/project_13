function generateLibrary() {
  const emptyLibrary = libraryContainer.querySelector('.empty__library');
  const emptyLibraryText = libraryContainer.querySelector(
    '.empty__library-text'
  );
  const libraryCards = libraryContainer.querySelectorAll('.library-card li');

  // Перевіряємо, чи є елементи в списку
  if (libraryCards.length > 0) {
    emptyLibrary.classList.add('is-hidden');
    emptyLibraryText.classList.add('is-hidden');
  } else {
    emptyLibrary.classList.remove('is-hidden');
    emptyLibraryText.classList.remove('is-hidden');
  }
}
