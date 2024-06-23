const cardTemplate = document.querySelector('#card-template').content;

export function createCard (item, handleDeleteCard, openImageModal, currentUserId, handleLikeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const modalImage = document.querySelector('.popup_type_image');
  const popupImage = modalImage.querySelector('.popup__image');
  const popupCaption = modalImage.querySelector('.popup__caption');
  const cardNumberOfLikes = cardElement.querySelector('.card__number-of-likes');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  if (currentUserId !== item.owner._id){
    deleteButton.hidden = true;
  }

  const cardId = item._id;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardNumberOfLikes.textContent = item.likes.length;

  const likeIt = item.likes.some(like => like._id === currentUserId);
  if (likeIt) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardLikeButton.addEventListener('click', () => handleLikeCard(checkStatusLike(cardLikeButton), cardNumberOfLikes, cardLikeButton, cardId));
  deleteButton.addEventListener('click', () => handleDeleteCard(cardElement, cardId));
  cardImage.addEventListener('click', () => openImageModal(cardImage, modalImage, popupImage, popupCaption));

  return cardElement;
}

function checkStatusLike(cardLikeButton) { 
  return cardLikeButton.classList.contains('card__like-button_is-active');
}

export function changeLike(res, cardNumberOfLikes, cardLikeButton) {
  cardLikeButton.classList.toggle('card__like-button_is-active');
  cardNumberOfLikes.textContent = res.likes.length;
}

export function deleteCard(card) {
  card.remove()
}