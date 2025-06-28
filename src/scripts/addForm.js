import { addForm, cardList, popupTypeAdd, popupTypeImage } from "./index.js";
import { createCard } from "./card.js";

export function handlerAddFormSubmit(evt) {
  evt.preventDefault();

  const inputPlace = addForm.elements['place-name'].value;
  const inputLink = addForm.elements['link'].value;

  const initialCard = {
    name: inputPlace,
    link: inputLink
  }

  const newCard = createCard(
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
  cardList.prepend(newCard);

  popupTypeAdd.classList.remove('popup_is-opened');
}