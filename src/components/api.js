// Конфиг API
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
    headers: {
      authorization: '8df05132-ed1c-4b3a-b5b0-ea33aed1f5b7',
      'Content-Type': 'application/json'
    }
}

const checkServer = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Загрузка информации о пользователе с сервера
export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(res => {
        return checkServer(res)
    })
} 

// Загрузка карточек с сервера
export const getCardData = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => {
        return checkServer(res)
    })
} 

// Редактирования профиля
export const editProfile = (nameValue, JobValue) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: nameValue,
          about: JobValue
        })
    })
    .then(res => {
        return checkServer(res)
    })
}

// Добавление новой карточки
export const addCard = (obj) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: obj.name,
          link: obj.link
        })
    })
    .then(res => {
        return checkServer(res)
    })
}

// Удаление карточки
export const deleteCardApi = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}` , {
        method: 'DELETE',
        headers: config.headers
    })
}

// Запрос постановки лайка карточки
export const addLikeCard = (idCard) => {
    return fetch(`${config.baseUrl}/cards/likes/${idCard} `, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => {
        return checkServer(res)
    })
}

// Запрос удаления лайки карточки
export const deleteLikeCard = (idCard) => {
    return fetch(`${config.baseUrl}/cards/likes/${idCard} `, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        return checkServer(res)
    })
}

// Запрос на смену аватарки
export const addNewAvatar = (urlAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: urlAvatar
        })
    })
    .then(res => {
        return checkServer(res)
    })
}