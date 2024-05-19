export {profileFormElement, nameInput, jobInput,
        profileTitle, profileDescription,
        addCardFormElement, linkInput, placeNameinput,
        popups}

const popups = document.querySelectorAll('.popup');

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardFormElement = document.forms['new-place'];
const linkInput = addCardFormElement.elements.link;
const placeNameinput = addCardFormElement.elements['place-name'];