import {placesList, popupProfile, popupNewCard, popupAvatar} from '../scripts/index.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {popups, nameInput, jobInput, profileTitle, profileDescription, linkInput, placeNameinput, addCardFormElement, linkAvatarinput, avatarFormElement, profileImage} from './constants.js';
import {editProfileInformation, sendNewCard, updateProfileAvatar} from './api.js';
import {clearValidation} from './validation.js';

export function openAddCardModal (button, modal, validationElements, addCardFormElement) {
  button.addEventListener('click', () => {
    addCardFormElement.reset();
    modalOpen(modal);
    clearValidation(addCardFormElement, validationElements);
});
}

export function openProfileModal (button, modal, validationElements, profileFormElement) {
  button.addEventListener('click', () => {
    fillOutTheProfileForm();
    modalOpen(modal);
    clearValidation(profileFormElement, validationElements);
  });
}

export function openProfileAvatarModal (button, modal, validationElements, avatarFormElement) {
  button.addEventListener('click', () => {
    avatarFormElement.reset();
    modalOpen(modal);
    clearValidation(avatarFormElement, validationElements);
  })
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
  renderLoading(event.submitter, true);
  editProfileInformation(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
    })
    .catch(err => {
      console.log(err);
      modalClose(popupProfile);
    })
    .finally(() => {
      renderLoading(event.submitter, false);
      modalClose(popupProfile);
    })
}

export function handleFormAddCardSubmit(event) {
  event.preventDefault();
  renderLoading(event.submitter, true);
  const newCard = {
      name: placeNameinput.value,
      link: linkInput.value,
    }
    sendNewCard(newCard)
    .then(newCard => {
      const currentUserId = newCard.owner._id;
      placesList.prepend(createCard(newCard, deleteCard, likeCard, openImageModal, currentUserId));
      addCardFormElement.reset();
    })
    .catch(err => {
      console.log(err);
      addCardFormElement.reset();
      modalClose(popupNewCard);
    })
    .finally(() => {
      renderLoading(event.submitter, false);
      modalClose(popupNewCard);
    })
}

export function handleAvatarFormSubmit(event) {
  event.preventDefault();
  renderLoading(event.submitter, true);
  const avatar = {
    avatar: linkAvatarinput.value
  }
  updateProfileAvatar(avatar)
    .then(avatar => {
      profileImage.style.backgroundImage = `url('${avatar.avatar}')`
      avatarFormElement.reset();
    })
    .catch(err => {
      console.log(err);
      modalClose(popupAvatar);
      avatarFormElement.reset();
    })
    .finally(() => {
      renderLoading(event.submitter, false);
      modalClose(popupAvatar);
    })
}

function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = 'Сохранить';
  }
}