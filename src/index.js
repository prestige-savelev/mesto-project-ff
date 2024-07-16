import './pages/index.css';
import {createCard, likeCard, deleteCard} from './components/cards.js';
import {openPopap, exitPopap} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserData, getCardData, editProfile, addCard, addNewAvatar} from './components/api.js';

// Переменные попапов
const popapTypeNewCard = document.querySelector('.popup_type_new-card')
const popapTypeEditProfile = document.querySelector('.popup_type_edit')
const popapTypeImage = document.querySelector('.popup_type_image')
const popupTypeDeleteCard = document.querySelector('.popup_type_delete')
const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar')

// Формы попапов в DOM
const profileForm = popapTypeEditProfile.querySelector('.popup__form')
const cardForm = popapTypeNewCard.querySelector('.popup__form')
const avatarForm = popupTypeNewAvatar.querySelector('.popup__form')

// Находим поля формы в DOM
const nameInput = profileForm.querySelector('.popup__input_type_name') 
const jobInput = profileForm.querySelector('.popup__input_type_description') 
const titleInput = cardForm.querySelector('.popup__input_type_card-name')
const linkInput = cardForm.querySelector('.popup__input_type_url')
const linkImage = avatarForm.querySelector('.popup__input_type_avatar')

// Элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')

// Переменные кнопок вызовов попапов
const profileAdd = document.querySelector('.profile__add-button')
const profileEdit = document.querySelector('.profile__edit-button')
const popapImage = document.querySelector('.popup__image');
const popapTitle = document.querySelector('.popup__caption');
// Переменные сабмитов

const popupButtonProfile = profileForm.querySelector('.popup__button')
const popupButtonCard = cardForm.querySelector('.popup__button')
const popupButtonAvatar = avatarForm.querySelector('.popup__button')

// DOM узел всех карточек
const placesList = document.querySelector('.places__list');

// Api глобальные переменные
let userId;

// Обработчики открытия попапов
profileAdd.addEventListener('click', () => {openPopap(popapTypeNewCard), clearValidation(cardForm, validationConfig)})
profileEdit.addEventListener('click', () => {openPopap(popapTypeEditProfile), clearValidation(profileForm, validationConfig)})
profileImage.addEventListener('click', () => {openPopap(popupTypeNewAvatar), clearValidation(avatarForm, validationConfig)})

// Функции работы с попапами 

// Функция смены аватарки
function handleProfileImageSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let linkNewAvatar = linkImage.value
    renderLoading(true, popupButtonAvatar)
    addNewAvatar(linkNewAvatar)
    .then((res) => {
        profileImage.style = `background-image: url(${res.avatar})`
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
        renderLoading(false, popupButtonAvatar)
    })
    exitPopap(popupTypeNewAvatar)
}

// Функция редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей из свойства value
    const nameValue = nameInput.value
    const JobValue = jobInput.value
    // Новые значения
    profileTitle.textContent = nameValue
    profileDescription.textContent = JobValue
    renderLoading(true, popupButtonProfile) // Эта функция добавляет загрузку данных
    // Отправка изменённых данных
    editProfile(nameValue, JobValue)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
        renderLoading(false, popupButtonProfile) // Эта функция добавляет загрузку данных
    })
    // Закрываем попап
    exitPopap(popapTypeEditProfile)
}

// Функция добавления
function handleAddCardSubmit(evt) {
    clearValidation(cardForm, validationConfig) // Эта строчка очишяет ошибки валидации
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Добавляем в массив данные из полей
    const newCard = {name: titleInput.value, link: linkInput.value}
    renderLoading(true, popupButtonCard) // Эта функция добавляет загрузку данных
    // Отправка данних созданой карточки
    addCard(newCard)
    .then((res)=> {
        placesList.prepend(createCard(res, likeCard, handleImageClick, userId));
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
        renderLoading(false, popupButtonCard)
    })
    // Сброс формы
    cardForm.reset()
    // Закрытие попапа
    exitPopap(popapTypeNewCard)    
}

// Функция открытия карточки
function handleImageClick(evt) {
    popapImage.src = evt.target.src 
    popapImage.alt = evt.target.alt 
    popapTitle.textContent = evt.target.alt 
    openPopap(popapTypeImage)
}

// Процесс загрузки
function renderLoading(isLoading, submitButton) {
    if (isLoading) {
        submitButton.innerText = 'Сохранение..';
    } else {
        submitButton.innerText = 'Сохранить';
    } 
}

// Обработчики сабмита попапов

// Обработчик добавления карточки:
cardForm.addEventListener('submit', handleAddCardSubmit); 

// Обработчик удаления карточки
popupTypeDeleteCard.addEventListener('submit', deleteCard)

// Обработчик добавления редактирования профиля:
profileForm.addEventListener('submit', handleProfileFormSubmit); 

// Обработчик добавления нового аватара
avatarForm.addEventListener('submit' , handleProfileImageSubmit)

// Валидация

// Конфиг валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Валидация полей
enableValidation(validationConfig);

// Общий промис показа данных и кард
Promise.all([getUserData(), getCardData()])
.then((result) => {
    userId = result[0]._id
    profileImage.style = `background-image:url(${result[0].avatar})`
    profileTitle.textContent = result[0].name
    profileDescription.textContent = result[0].about
    nameInput.value = result[0].name
    jobInput.value = result[0].about
    result[1].forEach(function(item) {
        placesList.append(createCard(item, likeCard, handleImageClick, result[0]._id))
    })
})
.catch((err) => {
    console.log(err); // выводим ошибку в консоль
})