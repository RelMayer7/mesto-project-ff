import { deleteCardRequest, removeLike, addLike } from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard (item, deleteCard, likeCard, openImageModal, currentUserId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const modalImage = document.querySelector('.popup_type_image');
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

  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, cardId, cardNumberOfLikes));
  deleteButton.addEventListener('click', () => deleteCard(cardElement, cardId));
  cardImage.addEventListener('click', () => openImageModal(cardImage, modalImage));

  return cardElement;
}

export function likeCard(cardLikeButton, cardId, cardNumberOfLikes){
  const likeIt = cardLikeButton.classList.contains('card__like-button_is-active');

  if (likeIt) {
    removeLike(cardId)
      .then(res =>{
        cardLikeButton.classList.remove('card__like-button_is-active');
        cardNumberOfLikes.textContent = res.likes.length;
      })
      .catch(err => {
        console.log(err);
      });
  }
  else {
    addLike(cardId)
      .then(res => {
        cardLikeButton.classList.add('card__like-button_is-active');
        cardNumberOfLikes.textContent = res.likes.length;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export function deleteCard (card, cardId) {
  deleteCardRequest(cardId)
    .then(() => {
      card.remove()
    })
    .catch(err => {
      console.log(err);
    });
}