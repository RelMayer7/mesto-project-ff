// Токен: a8cb1b2a-4431-497b-bdfb-7d64af336a26
// Идентификатор группы: wff-cohort-15

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-15',
  headers: {
    authorization: 'a8cb1b2a-4431-497b-bdfb-7d64af336a26',
    'Content-Type': 'application/json'
  }
}

export function getUserData(){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Не удалось получить информцию о профиле: ${res.status}`);
  })
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Не удалось загрузить карточки: ${res.status}`);
  })
}

export function editProfileInformation(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({name, about})
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Не удалось обновить информацию о профиле: ${res.status}`);
  })
}

export function sendNewCard(newCard) {
  return fetch(`${config.baseUrl}/cards`,{
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(newCard),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Не удалось отправить карточку: ${res.status}`);
  })
}

export function deleteCardRequest(cardId){
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Не удалось удалить карточку: ${res.status}`);
  })
}

export function addLike(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Не удалось поставить лайк карточке: ${res.status}`);
  })
}

export function removeLike(cardId){
return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
  method: 'DELETE',
  headers: config.headers,
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Не удалось удалить лайк карточки: ${res.status}`);
})
}

export function updateProfileAvatar(avatar){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(avatar),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Не удалось изменить аватар профиля: ${res.status}`);
  })
}