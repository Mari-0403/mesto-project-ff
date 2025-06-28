export function openModal(popupType) {
  setTimeout(() => {
    popupType.classList.add('popup_is-opened');
  }, 10) 
  popupType.classList.add('popup_is-animated')

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      popupType.classList.remove('popup_is-opened');
    } 
  })
}

export function closeModal(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    const popup = evt.currentTarget;
    popup.classList.remove('popup_is-opened');
  }
}