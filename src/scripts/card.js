const cardTemplate = document.querySelector('#card-template').content;

export function createCard (initialCard, { onDeleteCard, onLikeCard, onOpenImage } ) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;
    
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {onDeleteCard(card)});

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', onLikeCard);

  cardImage.addEventListener('click', () => {onOpenImage(card)});
    
  return card;
}

export function deleteCard(card) {
  card.remove()
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}