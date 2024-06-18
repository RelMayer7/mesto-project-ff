export {profileFormElement, nameInput, jobInput,
        profileTitle, profileDescription, profileImage,
        addCardFormElement, linkInput, placeNameinput,
        popups, avatarFormElement, linkAvatarinput}

const popups = document.querySelectorAll('.popup');

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const addCardFormElement = document.forms['new-place'];
const linkInput = addCardFormElement.elements.link;
const placeNameinput = addCardFormElement.elements['place-name'];

const avatarFormElement = document.forms['edit-avatar'];
const linkAvatarinput = avatarFormElement.elements.avatar;