// Конфигурация
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '8f4142bb-6227-47ba-8545-b9b1768ed8ae',
    'Content-Type': 'application/json'
  }
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

// Запрос данных пользователя(меня)
export const fetchUserPromise = fetch (`${config.baseUrl}/users/me`, {
  headers: config.headers
})
.then(res => checkResponse(res))

// Переключатель лайка
export const toggleLike = (cardId, isLiked) => {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
  method: isLiked ? 'DELETE' : 'PUT', 
  headers: config.headers
  })
  .then(res => checkResponse(res))
}

// Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE', 
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

// Обработка ответа профиля
export const handlerProfileRequest = (profileData = null) => {
  const options = {
    method: 'PATCH', 
    headers: config.headers
  }

  if(profileData) {
    options.body = JSON.stringify(profileData);
  }

  return fetch(`${config.baseUrl}/users/me`, options)
  .then(res => checkResponse(res))
}

// Обработка ответа карточки
export const handleCardsRequest = (method = 'GET', cardData = null, cardId = '') => {
  const options = {
    method, 
    headers: config.headers
  }

  if(cardData) {
    options.body = JSON.stringify(cardData);
  }

  return fetch(`${config.baseUrl}/cards${cardId}`, options)
  .then(res => checkResponse(res))
}

export const editAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
  .then(res => checkResponse(res))
}