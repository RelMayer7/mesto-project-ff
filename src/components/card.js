import { placesList } from "../scripts/index.js";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard (item, deleteCard, likeCard, openImageModal) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const modalImage = document.querySelector('.popup_type_image');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  cardImage.addEventListener('click', () => openImageModal(cardImage, modalImage));
  placesList.addEventListener('click', likeCard);

  return cardElement;
}

export function deleteCard (card) {
  card.remove();
}

export function likeCard (event) {
  if (event.target.classList.contains('card__like-button')){
    event.target.classList.toggle('card__like-button_is-active');
  }
}