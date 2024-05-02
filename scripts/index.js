// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function CreateCard (link, name, DeleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', DeleteCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function DeleteCard () {
  const cardElement = document.querySelector('.card');
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => placesList.append(CreateCard(item.link, item.name, DeleteCard)));