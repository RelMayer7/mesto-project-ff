export const validationElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function showInputError (formElement, inputElement, errorMessage, validationElements) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationElements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationElements.errorClass);
}

const hideInputError = (formElement, inputElement, validationElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationElements.inputErrorClass);
  errorElement.classList.remove(validationElements.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement, validationElements) {
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  else {
    inputElement.setCustomValidity("");
  }

  if(!inputElement.validity.valid)  {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationElements);
  }
  else {
    hideInputError(formElement, inputElement, validationElements);
  }
}

function setEventListeners (formElement, validationElements) {
  const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
  const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationElements);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationElements);
      toggleButtonState(inputList, buttonElement, validationElements);
    })
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, validationElements) {
  if (hasInvalidInput(inputList)) {
     buttonElement.disabled = true;
     buttonElement.classList.add(validationElements.inactiveButtonClass);
  }
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationElements.inactiveButtonClass);
  }
}

export function enableValidation(validationElements) {
  const formList = Array.from(document.querySelectorAll(validationElements.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, validationElements);
  })
};

export function clearValidation(formElement, validationElements) {
  const inputlist = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
  inputlist.forEach(inputElement => {
    hideInputError(formElement, inputElement, validationElements)
  })

  const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);
  buttonInactive(buttonElement, validationElements);
}

function buttonInactive(buttonElement, validationElements) {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationElements.inactiveButtonClass);
}