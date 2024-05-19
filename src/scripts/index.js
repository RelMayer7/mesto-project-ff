import '../pages/index.css';
import {initialCards} from '../components/cards.js';
import {createCard, deleteCard, likeCard} from '../components/card.js';
import {openProfileModal, openAddCardModal, openImageModal, handleProfileFormSubmit, handleFormAddCardSubmit} from '../components/modal.js';
import {profileFormElement, addCardFormElement} from '../components/constants.js';
export {placesList, popupProfile, popupNewCard}


const placesList = document.querySelector('.places__list');

initialCards.forEach((item) => placesList.append(createCard(item, deleteCard, likeCard, openImageModal)));

const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const openProfileEditButton = document.querySelector('.profile__edit-button');
const openProfileAddButton = document.querySelector('.profile__add-button');

openProfileModal(openProfileEditButton, popupProfile);
openAddCardModal(openProfileAddButton, popupNewCard);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardFormElement.addEventListener('submit', handleFormAddCardSubmit);