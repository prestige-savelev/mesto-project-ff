import {openPopap, exitPopap} from './modal.js';
import {deleteCardApi, config} from './api.js'
// Переменные карточки
export let idCardForDelete;
// @todo: Темплейт карточки
const tempCard = document.getElementById('card-template').content;
// @todo: Функция создания карточки
export function createCard (cardData, deleteCard, likeCard, handleImageClick, idCreators) {
    // Клонировали шаблон из темплейта
    const itemClone = tempCard.querySelector('.places__item').cloneNode(true);
    // Переменные вложенных элементов
    const cardImg = itemClone.querySelector('.card__image');
    const cardTitle = itemClone.querySelector('.card__title');
    const buttonDeleteCard = itemClone.querySelector('.card__delete-button');
    const popupTypeDelete = document.querySelector('.popup_type_delete')
    const cardLike = itemClone.querySelector('.card__like-button')
    const cardLikeView = itemClone.querySelector('.card-like')
    // Проверка владельца карточки
    if (idCreators !== cardData.owner._id) {
      buttonDeleteCard.remove()
    }
    // Установили значения вложенных элементов
    cardImg.src = cardData.link;
    cardTitle.textContent = cardData.name;
    cardImg.alt = cardData.name;
    cardLikeView.textContent = cardData.likes.length
    // Обработчик удаления карточки
    buttonDeleteCard.addEventListener('click', function(evt) {
      openPopap(popupTypeDelete)
      idCardForDelete = cardData._id
      popupTypeDelete.addEventListener('submit' , function() {
        evt.target.closest('.places__item').remove();
        deleteCardApi(idCardForDelete);
        exitPopap(popupTypeDelete); 
      })
    })
    // Обработчик лайка карточки
    cardLike.addEventListener('click', likeCard)
    // Обработчик Просмотра изоображения
    cardImg.addEventListener('click', handleImageClick)
    // Возврат значения функции
    return itemClone;
}



// @todo: Функция удаления карточки
export function deleteCard(deleteCardDom) {
  deleteCardDom.remove()
}

// Функция лайка карточки
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}




