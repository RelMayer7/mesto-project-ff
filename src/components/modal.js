import {placesList, popupProfile, popupNewCard} from '../scripts/index.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {popups, nameInput, jobInput, profileTitle, profileDescription, linkInput, placeNameinput, addCardFormElement} from './constants.js';

export function openAddCardModal (button, modal) {
  button.addEventListener('click', () => {
    addCardFormElement.reset();
    modalOpen(modal);
});
}

export function openProfileModal (button, modal) {
  button.addEventListener('click', () => {
    fillOutTheProfileForm();
    modalOpen(modal);
});
}

export function openImageModal (image, modal) {
  modal.querySelector('.popup__image').src = image.src;
  modal.querySelector('.popup__caption').textContent = image.alt;
  modalOpen(modal);
}

popups.forEach((modal) => {
  modal.classList.add('popup_is-animated');

  modal.addEventListener('click', (event) => {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
      modalClose(modal);
    }
  })
})

function modalOpen(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', modalCloseEsc);
}

function modalClose(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('click', modalCloseEsc);
}

function modalCloseEsc (event) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (event.key === 'Escape') {
    modalClose(openedPopup);
  }
}

function fillOutTheProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

export function handleProfileFormSubmit(event) {
  event.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  modalClose(popupProfile);
}

export function handleFormAddCardSubmit(event) {
  event.preventDefault();
  const newCard = {
      name: placeNameinput.value,
      link: linkInput.value,
    }
  placesList.prepend(createCard(newCard, deleteCard, likeCard, openImageModal));
  addCardFormElement.reset();

  modalClose(popupNewCard);
}