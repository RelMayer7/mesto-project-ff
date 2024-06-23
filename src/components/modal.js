export function modalOpen(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', modalCloseEsc);
}

export function modalClose(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('click', modalCloseEsc);
}

function modalCloseEsc (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    modalClose(openedPopup);
  }
}