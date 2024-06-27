import './pages/index.css';
import {createCard, deleteCard, likeCard} from './components/cards.js';
import {openPopap, exitPopap} from './components/modal.js';
import {initialCards} from './components/initialCards.js';

// Переменные попапов
const popapNewCard = document.querySelector('.popup_type_new-card')
const popapTypeEdit = document.querySelector('.popup_type_edit')
const popapTypeImage = document.querySelector('.popup_type_image')
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
// Переменные кнопок вызовов попапов
const profileAdd = document.querySelector('.profile__add-button')
const profileEdit = document.querySelector('.profile__edit-button')
const popapImage = document.querySelector('.popup__image');
const popapTitle = document.querySelector('.popup__caption');
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placesList.append(createCard(item, deleteCard, likeCard, handleImageClick))
});

// Обработчики открытия попапов
profileAdd.addEventListener('click', function() {openPopap(popapNewCard)})
profileEdit.addEventListener('click', function() {openPopap(popapTypeEdit)})

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
    exitPopap(popapTypeEdit)
}

// Обработчик добавления редактирования профиля:
profileForm.addEventListener('submit', handleProfileFormSubmit); 

// Функция добавления
function handleAddCardSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей titleInput и linkInput из свойства value
    const titleValue = titleInput.value
    const linkValue = linkInput.value
    const newCard = {name: titleValue, link: linkValue}
    // Добавляем в массив данные из полей
    // Вставляем добавленный элемент в массив
    placesList.prepend(createCard(newCard, deleteCard, likeCard, handleImageClick))
    // Очищяем поля формы 
    cardForm.reset()
    // Закрываем попап
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






