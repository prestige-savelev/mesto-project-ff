// @todo: Темплейт карточки
let tempCard = document.getElementById('card-template').content;

// @todo: DOM узлы
let placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard (card, delButton) {
    // Клонировали шаблон из темплейта
    let itemClone = tempCard.querySelector('.places__item').cloneNode(true);
    // Переменные вложенных элементов
    let cardImg = itemClone.querySelector('.card__image');
    let cardTitle = itemClone.querySelector('.card__title');
    let cardDel = itemClone.querySelector('.card__delete-button');
    // Установили значения вложенных элементов
    cardImg.src = card.link;
    cardTitle.textContent = card.name;
    // Обработчик удаления карточки
    cardDel.addEventListener('click', delButton);
    // Возврат значения функции
    return itemClone;
}
// @todo: Функция удаления карточки
function delCard (evt) {
   evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placesList.append(addCard(item, delCard))
});