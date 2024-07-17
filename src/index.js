import './pages/index.css';
import {createCard, likeCard, deleteCard} from './components/cards.js';
import {openPopap, exitPopap} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserData, getCardData, editProfile, addCard, addNewAvatar} from './components/api.js';
import {renderLoading} from './components/utils.js'

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
let idCardForDelete;
let itemDomDelete;


// Обработчики открытия попапов
profileAdd.addEventListener('click', () => {openPopap(popapTypeNewCard)})
profileEdit.addEventListener('click', () => {openPopap(popapTypeEditProfile)})
profileImage.addEventListener('click', () => {openPopap(popupTypeNewAvatar)})

// Функции работы с попапами 

// Функция смены аватарки
function handleProfileImageSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const linkNewAvatar = linkImage.value
    renderLoading(true, popupButtonAvatar)
    addNewAvatar(linkNewAvatar)
    .then((res) => {
        profileImage.style = `background-image: url(${res.avatar})`
        clearValidation(avatarForm, validationConfig)
        exitPopap(popupTypeNewAvatar)
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
        renderLoading(false, popupButtonAvatar)
    })
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
    .then((res) => {
        clearValidation(profileForm, validationConfig)
        exitPopap(popapTypeEditProfile)    // Закрываем попап
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
        renderLoading(false, popupButtonProfile) // Эта функция добавляет загрузку данных
    })
}

// Функция добавления
function handleAddCardSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Добавляем в массив данные из полей
    const newCard = {name: titleInput.value, link: linkInput.value}
    renderLoading(true, popupButtonCard) // Эта функция добавляет загрузку данных
    // Отправка данних созданой карточки
    addCard(newCard)
    .then((res)=> {
        placesList.prepend(createCard(res, likeCard, handleImageClick, userId, buttonDeleteListener));
        cardForm.reset()    // Сброс формы
        clearValidation(cardForm, validationConfig)
        exitPopap(popapTypeNewCard) // Закрытие попапа  
    })
    .catch((err) => {
        console.log(err);   // выводим ошибку в консоль
    })
    .finally(()=> {
        renderLoading(false, popupButtonCard)
    })
}

// Функция открытия карточки
function handleImageClick(evt) {
    popapImage.src = evt.target.src 
    popapImage.alt = evt.target.alt 
    popapTitle.textContent = evt.target.alt 
    openPopap(popapTypeImage)
}

// Функция открытия попапа удаления 
const buttonDeleteListener = (buttonDeleteCard, cardData_id) => {
    buttonDeleteCard.addEventListener('click', (evt) => {
        openPopap(popupTypeDeleteCard)
        idCardForDelete = cardData_id
        itemDomDelete = evt.target.closest('.places__item')
    })
}

// Обработчики сабмита попапов

// Обработчик удаления карточки
popupTypeDeleteCard.addEventListener('submit', function(evt){
    evt.preventDefault()
    deleteCard(idCardForDelete, itemDomDelete)
})

// Обработчик добавления карточки:
cardForm.addEventListener('submit', handleAddCardSubmit); 

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
        placesList.append(createCard(item, likeCard, handleImageClick, result[0]._id, buttonDeleteListener))
    })
})
.catch((err) => {
    console.log(err); // выводим ошибку в консоль
})