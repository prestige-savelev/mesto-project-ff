// Конфиг API
export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
    headers: {
      authorization: '8df05132-ed1c-4b3a-b5b0-ea33aed1f5b7',
      'Content-Type': 'application/json'
    }
}

// Загрузка информации о пользователе с сервера
export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

    // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
} 
// Загрузка карточек с сервера
export const getCardData = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

    // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
} 

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
        if (res.ok) {
            return res.json();
        }

    // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
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
        if (res.ok) {
            return res.json();
        }

    // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
}

// Удаление карточки
export const deleteCardApi = (id) => {
    fetch(`${config.baseUrl}/cards/${id}` , {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

    // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
}