export {profileFormElement, nameInput, jobInput,
        profileTitle, profileDescription, profileImage,
        formAddCard, linkInput, placeNameinput,
        popups, avatarFormElement, linkAvatarinput, renderLoadingStatus}

const popups = document.querySelectorAll('.popup');

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const formAddCard = document.forms['new-place'];
const linkInput = formAddCard.elements.link;
const placeNameinput = formAddCard.elements['place-name'];

const avatarFormElement = document.forms['edit-avatar'];
const linkAvatarinput = avatarFormElement.elements.avatar;

const renderLoadingStatus = {
        saving : 'Сохранение...',
        save : 'Сохранить'
      }