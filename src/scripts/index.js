import '../pages/index.css';

import { createCard } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { handleEditFormSubmit } from './editForm.js';
import { handlerAddFormSubmit } from './addForm.js';

export const cardTemplate = document.querySelector('#card-template').content;
export const cardList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeAdd = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');

export const editForm = document.forms['edit-profile'];
export const addForm = document.forms['new-place'];

initialCards.forEach(function (initialCard) {
  const addedCard = createCard(
    initialCard, 
    (deleteCard) => {deleteCard.remove()}, 
    (evt) => {evt.target.classList.toggle('card__like-button_is-active')},
    () => {
      setTimeout(() => {
        popupTypeImage.classList.add('popup_is-opened');
      }, 10);
      popupTypeImage.classList.add('popup_is-animated');
    }
  );
  cardList.append(addedCard); 
});

editButton.addEventListener('click', () => {
  const profileName = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  const inputName = editForm.elements.name;
  const inputDescription = editForm.elements.description;

  inputName.value = profileName;
  inputDescription.value = profileDescription;

  openModal(popupTypeEdit)
});

addButton.addEventListener('click', () => openModal(popupTypeAdd));

popups.forEach((popup) => {
  popup.addEventListener('click', closeModal);
})

editForm.addEventListener('submit', handleEditFormSubmit)
addForm.addEventListener('submit', handlerAddFormSubmit);