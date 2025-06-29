export function openModal(popupType) {
  setTimeout(() => {
    popupType.classList.add('popup_is-opened');
  }, 10) 
  popupType.classList.add('popup_is-animated')

  document.addEventListener('keydown', handlerEscClose)
}

export function closeModal(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    const popup = evt.currentTarget;
    popup.classList.remove('popup_is-opened');
  }

  document.removeEventListener('keydown', handlerEscClose)
}

function handlerEscClose(evt) {
  const popup = document.querySelector('.popup_is-opened')
  
  if (evt.key === 'Escape') {
    popup.classList.remove('popup_is-opened');
  } 
};