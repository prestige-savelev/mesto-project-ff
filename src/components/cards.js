import {openPopap, exitPopap} from './modal.js';
import {addLikeCard, deleteLikeCard, deleteCardApi} from './api.js';

// Переменные карточки
let idCardForDelete;
let itemDomDelete;

// @todo: Темплейт карточки
const tempCard = document.getElementById('card-template').content;

// @todo: Функция создания карточки
export function createCard (cardData, likeCard, handleImageClick, idCreators) {
    // Клонировали шаблон из темплейта
    const itemClone = tempCard.querySelector('.places__item').cloneNode(true);
    // Переменные вложенных элементов
    const cardImg = itemClone.querySelector('.card__image');
    const cardTitle = itemClone.querySelector('.card__title');
    const buttonDeleteCard = itemClone.querySelector('.card__delete-button');
    const popupTypeDelete = document.querySelector('.popup_type_delete')
    const cardLikeButton = itemClone.querySelector('.card__like-button')
    const cardLike = itemClone.querySelector('.card-like')
    // Проверка владельца карточки
    if (idCreators !== cardData.owner._id) {
      buttonDeleteCard.remove()
    }
    // Проверка на лайк карточки
    const likeUser = cardData.likes
    likeUser.forEach(element => {
      if (element._id == idCreators) {
        cardLikeButton.classList.add('card__like-button_is-active')
      }
    })
    // Установили значения вложенных элементов
    cardImg.src = cardData.link;
    cardTitle.textContent = cardData.name;
    cardImg.alt = cardData.name;
    cardLike.textContent = cardData.likes.length
    // Обработчик открытия попапа подтверждения удаления карточки
    buttonDeleteCard.addEventListener('click', (evt) => {
      openPopap(popupTypeDelete)
      idCardForDelete = cardData._id
      itemDomDelete = evt.target.closest('.places__item')
    })
    // Обработчик лайка карточки
    cardLikeButton.addEventListener('click', (evt) => {
      likeCard(evt.target, cardData, cardLike)
    })
    // Обработчик Просмотра изоображения
    cardImg.addEventListener('click', handleImageClick)
    // Возврат значения функции
    return itemClone;
}

// Функция удаления карточки
export function deleteCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const popupTypeDeleteCard = document.querySelector('.popup_type_delete')
  itemDomDelete.remove();
  deleteCardApi(idCardForDelete)
  exitPopap(popupTypeDeleteCard); 
}

// Функция лайка карточки
export function likeCard(button, cardData, cardLike) {
  button.classList.toggle('card__like-button_is-active')
      if (button.classList.contains('card__like-button_is-active')) {
        addLikeCard(cardData._id)
        .then((res) => {
          cardLike.textContent = res.likes.length
        }) 
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
      })
      } else{
        deleteLikeCard(cardData._id)
        .then((res) => {
          cardLike.textContent = res.likes.length
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
      })
      }
}