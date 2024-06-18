import '../pages/index.css';
import {createCard, deleteCard, likeCard} from '../components/card.js';
import {openProfileModal, openAddCardModal, openImageModal, handleProfileFormSubmit, handleFormAddCardSubmit, openProfileAvatarModal, handleAvatarFormSubmit} from '../components/modal.js';
import {profileFormElement, addCardFormElement, avatarFormElement, profileTitle, profileDescription, profileImage} from '../components/constants.js';
import {enableValidation, validationElements} from '../components/validation.js';
import {getUserData, getCards} from '../components/api.js'
export {placesList, popupProfile, popupNewCard, popupAvatar}


const placesList = document.querySelector('.places__list');

const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_avatar');

const openProfileEditButton = document.querySelector('.profile__edit-button');
const openProfileAddButton = document.querySelector('.profile__add-button');

openProfileModal(openProfileEditButton, popupProfile, validationElements, profileFormElement);
openAddCardModal(openProfileAddButton, popupNewCard, validationElements, addCardFormElement);
openProfileAvatarModal(profileImage, popupAvatar, validationElements, avatarFormElement);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addCardFormElement.addEventListener('submit', handleFormAddCardSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

//API
Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`
    const currentUserId = userData._id;
    
    cards.forEach(item => {
      placesList.append(createCard(item, deleteCard, likeCard, openImageModal, currentUserId))
    })
  })
  .catch(err => {
    console.log(err);
  })

  enableValidation(validationElements);

