import './pages/index.css';
import {initialCards, createCard, deleteCard, likeCard} from './components/cards.js';
import {openPopap, exitPopap} from './components/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placesList.append(createCard(item, deleteCard, likeCard, imageOpen))
});

// Переменные попапов
const popapNewCard = document.querySelector('.popup_type_new-card')
const popapTypeEdit = document.querySelector('.popup_type_edit')
export const popapTypeImage = document.querySelector('.popup_type_image')

// Переменные кнопок вызовов попапов
const profileAdd = document.querySelector('.profile__add-button')
const profileEdit = document.querySelector('.profile__edit-button')

// Обработчики открытия попапов
profileAdd.addEventListener('click', function() {openPopap(popapNewCard)})
profileEdit.addEventListener('click', function() {openPopap(popapTypeEdit)})


// Редактирование профиля

// Находим форму в DOM
const formElement = popapTypeEdit.querySelector('.popup__form')// Воспользуйтесь методом querySelector()

// Функция редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Находим поля формы в DOM
    const nameInput = formElement.querySelector('.popup__input_type_name') // Воспользуйтесь инструментом .querySelector()
    const jobInput = formElement.querySelector('.popup__input_type_description') // Воспользуйтесь инструментом .querySelector()

    // Получаем значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value
    const JobValue = jobInput.value

    // Элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title')
    const profileDescription = document.querySelector('.profile__description')

    // Новые значения
    profileTitle.textContent = nameValue
    profileDescription.textContent = JobValue

    // Закрываем попап
    const popapIsOpen = document.querySelector('.popup_is-opened')
    exitPopap(popapIsOpen)
}

// Обработчик добавления редактирования профиля:
formElement.addEventListener('submit', handleFormSubmit); 


// Добавление карточки 

// Находим форму в DOM
const formAddCard = popapNewCard.querySelector('.popup__form')

// Функция добавления
function addCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Находим поля формы в DOM
    const titleInput = formAddCard.querySelector('.popup__input_type_card-name')
    const linkInput = formAddCard.querySelector('.popup__input_type_url')
    // Получаем значение полей titleInput и linkInput из свойства value
    const titleValue = titleInput.value
    const linkValue = linkInput.value
    // Добавляем в массив данные из полей
    initialCards.push({name: titleValue, link: linkValue})
    // Вставляем добавленный элемент в массив
    placesList.prepend(createCard(initialCards[initialCards.length -1], deleteCard, likeCard, imageOpen))
    // Очищяем поля формы 
    formAddCard.reset()
    // Закрываем попап
    const popapIsOpen = document.querySelector('.popup_is-opened')
    exitPopap(popapIsOpen)
}

// Обработчик добавления карточки:
formAddCard.addEventListener('submit', addCard); 

// Функция попапа изоображения 
export function imageOpen(evt) {
    const popapImage = document.querySelector('.popup__image');
    const popapTitle = document.querySelector('.popup__caption');
    popapImage.src = evt.target.src 
    popapTitle.textContent = evt.target.alt 
    openPopap(popapTypeImage)
}






