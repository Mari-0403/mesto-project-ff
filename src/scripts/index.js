import '../pages/index.css';

import { createCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, cleanValidation } from './validation.js';
import { fetchUserPromise, toggleLike, handleCardsRequest, handlerProfileRequest, deleteCard, editAvatar } from './api.js';

const cardList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editForm = document.forms['edit-profile'];

const addButton = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_new-card');
const addForm = document.forms['new-place'];

const editAvatarButton = document.querySelector('.profile__image');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
const editAvatarForm = document.forms['update-avatar']

const popupTypeImage = document.querySelector('.popup_type_image');

// Открытие по клику редактирования профиля
editButton.addEventListener('click', () => {
  const profileName = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  const inputName = editForm.elements.name;
  const inputDescription = editForm.elements.description;

  inputName.value = profileName;
  inputDescription.value = profileDescription;

  openModal(popupTypeEdit, cleanValidation(editForm, {
    inputSelector: '.popup__input',
    buttonSelector: '.popup__button',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  }));
});

// Открытие по клику добавления карточки
addButton.addEventListener('click', () => {
  addForm.reset();
  openModal(popupTypeAdd, cleanValidation(addForm, {
    inputSelector: '.popup__input',
    buttonSelector: '.popup__button',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  }))
});

// Открытие формы редактирования аватара
editAvatarButton.addEventListener('click', () => {
  editAvatarForm.reset();
  openModal(popupTypeEditAvatar, cleanValidation(addForm, {
    inputSelector: '.popup__input',
    buttonSelector: '.popup__button',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  }))
})

// Добавление слушателя закрытия попапов
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => closeModal(evt, popup));
})

// Функция просмотра изображения карточки
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

  const submitButton = editForm.querySelector('.popup__button');
  toggleButtonState(submitButton, true);

  const profileData = {
    name: editForm.elements['name'].value,
    about: editForm.elements['description'].value
  }

  handlerProfileRequest(profileData)
    .then(() => {
      const profileName = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');
      
      profileName.textContent = profileData.name;
      profileDescription.textContent = profileData.about;

      closeModal(null, popupTypeEdit);
    })
    .catch((err) => console.log('Ошибка при отправке формы профиля:', err))
    .finally(() => toggleButtonState(submitButton, false))
}

//  Функция обработки добавки карточки
function handlerAddFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = addForm.querySelector('.popup__button');
  toggleButtonState(submitButton, true);

  const cardData = {
    name: addForm.elements['place-name'].value,
    link: addForm.elements['link'].value
  }

  Promise.all([handleCardsRequest('POST', cardData), fetchUserPromise])
  .then(([card, userData]) => {
    const userId = userData._id;

    const newCard = createCard(
      card, 
      {
        onDeleteCard: () => handlerDeleteCard(newCard, card._id), 
        onLikeCard: handlerLikeCard,
        onOpenImage: () => {openImage(initialCard, popupTypeImage), openModal(popupTypeImage, null)}
      },
      userId
      );
    cardList.prepend(newCard); 
    closeModal(null, popupTypeAdd);
    })
  .catch((err) => console.log('Ошибка в обработке Promise.all при создании карточки', err))
  .finally(() => toggleButtonState(submitButton, false))
}

// Функция обработки изменения аватара
function handlerEditAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = editAvatarForm.querySelector('.popup__button');
  toggleButtonState(submitButton, true);

  const newAvatar = editAvatarForm.elements['link-avatar'].value;

  editAvatar(newAvatar)
    .then((userData) => {
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url(${userData.avatar})`;

      closeModal(null, popupTypeEditAvatar);
    })
    .catch((err) => console.log('Ошибка в обновлении аватара:', err))
    .finally(() => toggleButtonState(submitButton, false))
}

// Добавление сабмита форм
editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handlerAddFormSubmit);
editAvatarForm.addEventListener('submit', handlerEditAvatarFormSubmit)

// Инициализация валидации форм с помощью объекта-конфигурации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'button__inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}); 

// Обработка запросов, вывод карточек, получение id-пользователя(меня)
Promise.all([handleCardsRequest(), fetchUserPromise])
  .then(([cardsData, userData]) => {
    const userId = userData._id;

    cardsData.forEach(function (initialCard) {
      const addedCard = createCard(
      initialCard, 
      {
        onDeleteCard: handlerDeleteCard, 
        onLikeCard: handlerLikeCard,
        onOpenImage: () => {openImage(initialCard, popupTypeImage), openModal(popupTypeImage, null)}
      },
      userId
      );
    cardList.append(addedCard); 
    });
  })
  .catch((err) => console.log('Ошибка в обработке Promise.all при загрузке карточек с сервера', err))

// Запрос инфы по мне, сохранение данных с сервера в профиль
fetchUserPromise
  .then((data) => {
    const profileImage = document.querySelector('.profile__image');
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    profileImage.alt = `Аватар пользователья ${data.name}`;
  })
  .catch((err) => console.log("Ошибка при загрузке данных пользователя", err))

  // Обработка лайка
const handlerLikeCard = (card, cardId, isLiked, likeCounter) => {  
  toggleLike(cardId, isLiked)
    .then((updateLikes) => {
      likeCounter.textContent = updateLikes.likes.length;
      const likeButton = card.querySelector('.card__like-button');
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => console.log('Ошибка при обновлении лайка:', err))
}

// Обработка удаления
const handlerDeleteCard = (cardElement, cardId) => {
  deleteCard(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((err) => console.log('Ошибка в обработки удаления карточки:', err))
}

// Переключение состояния кнопки во время загрузик
function toggleButtonState(button, isLoading, defaultText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.disabled = true;
    button.textContent = loadingText;
    button.classList.add('button_loading');
  } else {
    button.disabled = false;
    button.textContent = defaultText;
    button.classList.remove('button_loading');
  }
}