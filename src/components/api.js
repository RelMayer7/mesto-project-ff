const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-15',
  headers: {
    authorization: 'a8cb1b2a-4431-497b-bdfb-7d64af336a26',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserData(){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(res => checkResponse(res));
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(res => checkResponse(res));
}

export function editProfileInformation(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({name, about})
  })
  .then(res => checkResponse(res));
}

export function sendNewCard(newCard) {
  return fetch(`${config.baseUrl}/cards`,{
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(newCard),
  })
  .then(res => checkResponse(res));
}

export function deleteCardRequest(cardId){
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => checkResponse(res));
}

export function putLikeCard(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => checkResponse(res));
}

export function removeLike(cardId){
return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => checkResponse(res));
}

export function updateProfileAvatar(avatar){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(avatar),
  })
  .then(res => checkResponse(res));
}