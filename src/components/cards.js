import {imageOpen} from '../index.js'

export const initialCards = [
    {
      name: "Лондон",
      link: 'https://images.unsplash.com/photo-1716220557737-f2616bd6bb37?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: "Нью-Йорк",
      link: 'https://images.unsplash.com/photo-1715694290840-bd862815c8ba?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: "Иваново",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: "Камчатка",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' ,
    },
    {
      name: "Холмогорский район",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: "Байкал",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];


// @todo: Темплейт карточки
const tempCard = document.getElementById('card-template').content;

// @todo: Функция создания карточки
export function createCard (cardData, deleteCard, likeCard, imageOpen) {
    // Клонировали шаблон из темплейта
    const itemClone = tempCard.querySelector('.places__item').cloneNode(true);
    // Переменные вложенных элементов
    const cardImg = itemClone.querySelector('.card__image');
    const cardTitle = itemClone.querySelector('.card__title');
    const buttonDeleteCard = itemClone.querySelector('.card__delete-button');
    const cardLike = itemClone.querySelector('.card__like-button')
    // Установили значения вложенных элементов
    cardImg.src = cardData.link;
    cardTitle.textContent = cardData.name;
    cardImg.alt = cardData.name;
    // Обработчик удаления карточки
    buttonDeleteCard.addEventListener('click', deleteCard);
    // Обработчик лайка карточки
    cardLike.addEventListener('click', likeCard)
    // Обработчик Просмотра изоображения
    cardImg.addEventListener('click', imageOpen)
    // Возврат значения функции
    return itemClone;
}

// @todo: Функция удаления карточки
export function deleteCard (evt) {
   evt.target.closest('.places__item').remove();
}

// Функция лайка карточки
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}




