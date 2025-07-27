const cardTemplate = document.querySelector('#card-template').content;

export function createCard (initialCard, { onDeleteCard, onLikeCard, onOpenImage }, userId ) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeCounter = card.querySelector('.card__quantiti-like');
  const likeButton = card.querySelector('.card__like-button');
  
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;
  likeCounter.textContent = initialCard.likes.length;

  const deleteButton = card.querySelector('.card__delete-button');
  if(initialCard.owner._id !== userId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.style.display = 'block'
  }
  deleteButton.addEventListener('click', () => {onDeleteCard(card, initialCard._id)});

  cardImage.addEventListener('click', () => {onOpenImage(card)});
    
  const isLiked = initialCard.likes.some(like => like._id === userId);
  
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    const currentLikeStatus = likeButton.classList.contains('card__like-button_is-active')
    onLikeCard(card, initialCard._id, currentLikeStatus, likeCounter);
  });

  return card;
}

// export function deleteCard(card) {
//   card.remove()
// }