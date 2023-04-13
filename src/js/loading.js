const newDiv = document.createElement('div');

export function displayLoading() {
  newDiv.classList.add('is-displayed');
  document.body.append(newDiv);
}

export function hideLoading() {
    newDiv.remove()
}
