import '../pages/index.css';
import {createCard, deleteCard, changeLike} from '../components/card.js';
import {modalOpen, modalClose} from '../components/modal.js';
import {enableValidation, validationElements, clearValidation} from '../components/validation.js';
import {getUserData, getCards, editProfileInformation, sendNewCard, updateProfileAvatar, removeLike, putLikeCard, deleteCardRequest} from '../components/api.js';
import {
  popups, profileFormElement, formAddCard, avatarFormElement, 
  profileTitle, profileDescription, profileImage, nameInput, 
  jobInput, renderLoadingStatus, linkAvatarinput,
  placeNameinput, linkInput
} from '../components/constants.js';


const placesList = document.querySelector('.places__list');
const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

openProfileModal(profileEditButton, popupProfile, validationElements, profileFormElement);
openAddCardModal(profileAddButton, popupNewCard, validationElements, formAddCard);
openProfileAvatarModal(profileImage, popupAvatar, validationElements, avatarFormElement);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`
    const currentUserId = userData._id;
    
    cards.forEach(item => {
      placesList.append(createCard(item, handleDeleteCard, openImageModal, currentUserId, handleLikeCard))
    })
  })
  .catch(err => {
    console.log(err);
  })

  enableValidation(validationElements);

function openAddCardModal (button, modal, validationElements, formAddCard) {
  button.addEventListener('click', () => {
    formAddCard.reset();
    modalOpen(modal);
    clearValidation(formAddCard, validationElements);
});
}

function openProfileModal (button, modal, validationElements, profileFormElement) {
  button.addEventListener('click', () => {
    fillOutTheProfileForm();
    modalOpen(modal);
    clearValidation(profileFormElement, validationElements);
  });
}

function openProfileAvatarModal (button, modal, validationElements, avatarFormElement) {
  button.addEventListener('click', () => {
    avatarFormElement.reset();
    modalOpen(modal);
    clearValidation(avatarFormElement, validationElements);
  })
}

function openImageModal (image, modal, popupImage, popupCaption) {
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;
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

function fillOutTheProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(event) {
  event.preventDefault(); 
  renderLoading(event.submitter, renderLoadingStatus.saving);
  editProfileInformation(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(event.submitter, renderLoadingStatus.save);
      modalClose(popupProfile);
    })
}

function handleFormAddCardSubmit(event) {
  event.preventDefault();
  renderLoading(event.submitter, renderLoadingStatus.saving);
  const newCard = {
      name: placeNameinput.value,
      link: linkInput.value,
    }
    sendNewCard(newCard)
    .then(newCard => {
      const currentUserId = newCard.owner._id;
      placesList.prepend(createCard(newCard, handleDeleteCard, openImageModal, currentUserId, handleLikeCard));
      formAddCard.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(event.submitter, renderLoadingStatus.save);
      modalClose(popupNewCard);
    })
}

function handleAvatarFormSubmit(event) {
  event.preventDefault();
  renderLoading(event.submitter, renderLoadingStatus.saving);
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
    })
    .finally(() => {
      renderLoading(event.submitter, renderLoadingStatus.save);
      modalClose(popupAvatar);
    })
}

function renderLoading(button, status) {
    button.textContent = status;
}

function handleLikeCard(status, cardNumberOfLikes, cardLikeButton, cardId) {
  if (!status) {
    putLikeCard(cardId)
      .then(res => changeLike(res, cardNumberOfLikes, cardLikeButton))
      .catch(err => console.log(err))
  }
  else {
    removeLike(cardId)
    .then(res => changeLike(res, cardNumberOfLikes, cardLikeButton))
    .catch(err => console.log(err))
  }
}

function handleDeleteCard (card, cardId) {
  deleteCardRequest(cardId)
  .then(() => deleteCard(card))
  .catch(err => console.log(err))
}