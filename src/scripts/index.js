import '../pages/index.css';

import { createCard, deleteCard, likeCard } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';

const cardList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editForm = document.forms['edit-profile'];

const addButton = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_new-card');
const addForm = document.forms['new-place'];

const popupTypeImage = document.querySelector('.popup_type_image');

initialCards.forEach(function (initialCard) {
  const addedCard = createCard(
    initialCard, 
    {
      onDeleteCard: deleteCard, 
      onLikeCard: likeCard,
      onOpenImage: () => {openImage(initialCard, popupTypeImage), openModal(popupTypeImage)}
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

  openModal(popupTypeEdit);
});

addButton.addEventListener('click', () => {
  addForm.reset();
  openModal(popupTypeAdd)
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => closeModal(evt, popup));
})

// Функция просмотра карточки
function openImage(card, popupType){ 
  const popupImage = popupType.querySelector('img');
  const popupTitle = popupType.querySelector('p');

  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupTitle.textContent = card.name;

  openModal(popupType);
}

// Функция обработки редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const inputName = editForm.elements['name'].value;
  const inputDescription = editForm.elements['description'].value; 

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = inputName;
  profileDescription.textContent = inputDescription;
  
  closeModal(null, popupTypeEdit);
}

//  Функция обработки добавки карточки
function handlerAddFormSubmit(evt) {
  evt.preventDefault();

  let inputPlace = addForm.elements['place-name'].value;
  let inputLink = addForm.elements['link'].value;

  const initialCard = {
    name: inputPlace,
    link: inputLink
  }

  const newCard = createCard(
    initialCard, 
    {
      onDeleteCard: deleteCard,
      onLikeCard: likeCard,
      onOpenImage: () => {openImage(initialCard, popupTypeImage)}
    }
  );
  cardList.prepend(newCard);

  evt.target.reset();

  closeModal(null, popupTypeAdd);
}

editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handlerAddFormSubmit);