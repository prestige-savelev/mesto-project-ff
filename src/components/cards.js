import {openPopap} from './modal.js';
// Переменные карточки

const popapTypeImage = document.querySelector('.popup_type_image')
// @todo: Темплейт карточки
const tempCard = document.getElementById('card-template').content;

// @todo: Функция создания карточки
export function createCard (cardData, deleteCard, likeCard, handleImageClick) {
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
    cardImg.addEventListener('click', handleImageClick)
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




