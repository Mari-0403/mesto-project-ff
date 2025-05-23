const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

function createCard (initialCard, deleteCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;
    
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {deleteCard(card)})  

  return card;
}

initialCards.forEach(function (initialCard) {
  const addedCard = createCard(initialCard, (deleteCard) => {deleteCard.remove()});
  cardList.append(addedCard); 
});