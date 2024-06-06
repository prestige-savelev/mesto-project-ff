// @todo: Темплейт карточки
const tempCard = document.getElementById('card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (cardData, deleteCard) {
    // Клонировали шаблон из темплейта
    const itemClone = tempCard.querySelector('.places__item').cloneNode(true);
    // Переменные вложенных элементов
    const cardImg = itemClone.querySelector('.card__image');
    const cardTitle = itemClone.querySelector('.card__title');
    const buttonDeleteCard = itemClone.querySelector('.card__delete-button');
    // Установили значения вложенных элементов
    cardImg.src = cardData.link;
    cardTitle.textContent = cardData.name;
    cardImg.alt = cardData.name;
    // Обработчик удаления карточки
    buttonDeleteCard.addEventListener('click', deleteCard);
    // Возврат значения функции
    return itemClone;
}
// @todo: Функция удаления карточки
function deleteCard (evt) {
   evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placesList.append(createCard(item, deleteCard))
});