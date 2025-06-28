import { cardTemplate } from './index.js';

export function createCard (initialCard, deleteCard, likeCard, openCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;
    
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {deleteCard(card)})  

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard)

  const popupImage = document.querySelector('.popup__image');
  const popupTitle = document.querySelector('.popup__caption'); 
  cardImage.addEventListener('click', () => {
    openCard();
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupTitle.textContent = cardTitle.textContent;
  });

  return card;
}