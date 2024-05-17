import '../pages/index.css';
import {initialCards, createCard, deleteCard, likeCard} from '../components/cards.js';
import {modalOpenEventListenner, modalCloseEventListenner, modalImageOpen} from '../components/modal.js';
export {placesList}


const placesList = document.querySelector('.places__list');

initialCards.forEach((item) => placesList.append(createCard(item, deleteCard, likeCard, modalImageOpen)));


//Modal -------------------------------------------------------------------------------------------------->
const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const openProfileEditButton = document.querySelector('.profile__edit-button');
const openProfileAddButton = document.querySelector('.profile__add-button');

modalOpenEventListenner(openProfileEditButton, popupProfile);
modalOpenEventListenner(openProfileAddButton, popupNewCard);

modalCloseEventListenner(popupProfile);
modalCloseEventListenner(popupNewCard);
modalCloseEventListenner(popupImage);