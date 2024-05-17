import {placesList} from '../scripts/index.js';
import {createCard, deleteCard, likeCard} from './cards.js';

export function modalOpenEventListenner (button, modal) {
  modal.classList.add('popup_is-animated');
  button.addEventListener('click', () => modalOpen(modal));
}

export function modalImageOpen(image, modal) {
  modal.classList.add('popup_is-animated');
  modal.querySelector('.popup__image').src = image.src;
  modal.querySelector('.popup__caption').textContent = image.alt;
  modalOpen(modal);
}

export function modalCloseEventListenner (modal) {
  const closeButton = modal.querySelector('.popup__close');
  console.log(modal);
  closeButton.addEventListener('click', () => modalClose(modal));
}

function modalOpen(modal) {
  modal.classList.add('popup_is-opened');

  if (modal.classList.contains('popup_type_edit')) {
    fillOutTheForm();
  }

  document.addEventListener('keydown', (event) => modalCloseEsc(event, modal));
  document.addEventListener('click', (event) => modalClosebg(event, modal));
}

function modalClose(modal) {
  modal.classList.remove('popup_is-opened');

  if (modal.classList.contains('popup_type_new-card')) {
    formAddCardElement.reset();
  }
}

function modalCloseEsc (event, modal) {
  if (event.key === 'Escape') {
    modalClose(modal);
  }
}

function modalClosebg (event, modal) {
  if (event.target === modal) {
    modalClose(modal);
  }
}

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

function fillOutTheForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleFormSubmit(event) {
  event.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  const openPopup = document.querySelector('.popup_is-opened');
  modalClose(openPopup);
}

formElement.addEventListener('submit', handleFormSubmit);

const formAddCardElement = document.forms['new-place'];
const linkInput = formAddCardElement.elements.link;
const placeNameinput = formAddCardElement.elements['place-name'];

function HandleFormAddCardSubmit(event) {
  event.preventDefault();
  const newCard = {
      name: placeNameinput.value,
      link: linkInput.value,
    }
  placesList.prepend(createCard(newCard, deleteCard, likeCard, modalImageOpen));
  formAddCardElement.reset();

  const openPopup = document.querySelector('.popup_is-opened');
  modalClose(openPopup);
}

formAddCardElement.addEventListener('submit', HandleFormAddCardSubmit);







