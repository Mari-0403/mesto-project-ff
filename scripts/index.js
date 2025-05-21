const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

function addCard (initialCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__image').src = initialCard.link;
  card.querySelector('.card__image').alt = initialCard.name;
  card.querySelector('.card__title').textContent = initialCard.name;
    
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    card.remove();
  })  

  cardList.append(card); 
}

initialCards.forEach(initialCard => addCard(initialCard));