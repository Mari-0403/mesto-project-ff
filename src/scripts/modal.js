export function openModal(popupType, cleanForm) {
  setTimeout(() => {
    popupType.classList.add('popup_is-opened');
  }, 10) 
  popupType.classList.add('popup_is-animated')

  if (cleanForm) {
    cleanForm();
  }

  document.addEventListener('keydown', (evt) => handlerEscClose(evt, popupType))
}

export function closeModal(evt, popupType) {
  if (!evt || evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    popupType.classList.remove('popup_is-opened');
  }

  document.removeEventListener('keydown', (evt) => handlerEscClose(evt, popupType));
}

function handlerEscClose(evt, popup) {  
  if (evt.key === 'Escape') {
    closeModal(null, popup);
  } 
}