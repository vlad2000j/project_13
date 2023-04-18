const newDiv = document.createElement("div");


export function displayLoading() {
  newDiv.classList.add('is-displayed');
  return newDiv
}

export function hideLoading() {
  newDiv.remove()
}
