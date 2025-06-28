import { editForm, popupTypeEdit } from "./index.js";

export function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const inputName = editForm.elements['name'].value;
  const inputDescription = editForm.elements['description'].value;

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = inputName;
  profileDescription.textContent = inputDescription;
  
  popupTypeEdit.classList.remove('popup_is-opened');
}