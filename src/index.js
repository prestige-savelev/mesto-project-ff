import './pages/index.css';
import {createCard, deleteCard, likeCard, idCardForDelete} from './components/cards.js';
import {openPopap, exitPopap} from './components/modal.js';
import {initialCards} from './components/initialCards.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserData, getCardData, editProfile, addCard, } from './components/api.js';


// Переменные попапов
const popapNewCard = document.querySelector('.popup_type_new-card')
const popapTypeEdit = document.querySelector('.popup_type_edit')
const popapTypeImage = document.querySelector('.popup_type_image')
const popupTypeDelete = document.querySelector('.popup_type_delete')
// Находим форму в DOM
const profileForm = popapTypeEdit.querySelector('.popup__form')
const cardForm = popapNewCard.querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = profileForm.querySelector('.popup__input_type_name') 
const jobInput = profileForm.querySelector('.popup__input_type_description') 
const titleInput = cardForm.querySelector('.popup__input_type_card-name')
const linkInput = cardForm.querySelector('.popup__input_type_url')
// Элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')
const cardLikeView = document.querySelector('.card-like')
// Переменные кнопок вызовов попапов
const profileAdd = document.querySelector('.profile__add-button')
const profileEdit = document.querySelector('.profile__edit-button')
const popapImage = document.querySelector('.popup__image');
const popapTitle = document.querySelector('.popup__caption');
const buttonDeleteCard = document.querySelector('.card__delete-button');
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// Обработчики открытия попапов
profileAdd.addEventListener('click', function() {openPopap(popapNewCard), clearValidation(cardForm, validationConfig)})
profileEdit.addEventListener('click', function() {openPopap(popapTypeEdit), clearValidation(profileForm, validationConfig)})


// Api глобальные переменные
let userId;

// Функция редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value
    const JobValue = jobInput.value
    // Новые значения
    profileTitle.textContent = nameValue
    profileDescription.textContent = JobValue
    // Закрываем попап
    editProfile(nameValue, JobValue)
    exitPopap(popapTypeEdit)
}

// Обработчик добавления редактирования профиля:
profileForm.addEventListener('submit', handleProfileFormSubmit); 

// Функция добавления
function handleAddCardSubmit(evt) {
    clearValidation(cardForm, validationConfig)
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Добавляем в массив данные из полей
    const newCard = {name: titleInput.value, link: linkInput.value}
    addCard(newCard)
    .then((res)=> {
        console.log(userId)
        placesList.prepend(createCard(res, deleteCard, likeCard, handleImageClick, userId));
    })
    cardForm.reset()
    exitPopap(popapNewCard)    
}

// Обработчик добавления карточки:
cardForm.addEventListener('submit', handleAddCardSubmit); 

// Функция открытия карточки
function handleImageClick(evt) {
    popapImage.src = evt.target.src 
    popapImage.alt = evt.target.alt 
    popapTitle.textContent = evt.target.alt 
    openPopap(popapTypeImage)
}

// Валидация
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig); 



// API
// Адрес сервера проекта Mesto: https://mesto.nomoreparties.co.
// Токен: 8df05132-ed1c-4b3a-b5b0-ea33aed1f5b7
// Идентификатор группы: wff-cohort-18


// return fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
//   headers: {
//     authorization: '8df05132-ed1c-4b3a-b5b0-ea33aed1f5b7'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// Конфиг API
export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
    headers: {
      authorization: '8df05132-ed1c-4b3a-b5b0-ea33aed1f5b7',
      'Content-Type': 'application/json'
    }
}

// Общий прмис
Promise.all([getUserData(), getCardData()])
.then((result) => {
    userId = result[0]._id
    profileImage.style = `background-image:url(${result[0].avatar})`
    profileTitle.textContent = result[0].name
    profileDescription.textContent = result[0].about
    nameInput.value = result[0].name
    jobInput.value = result[0].about
    result[1].forEach(function(item) {
        placesList.append(createCard(item, deleteCard, likeCard, handleImageClick, result[0]._id))
    })
})
.catch((err) => {
    console.log(err); // выводим ошибку в консоль
})
