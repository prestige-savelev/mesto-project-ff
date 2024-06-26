// Функция открытия попапа
export function openPopap(popap) {
    popap.classList.add('popup_is-opened');
    document.addEventListener('keydown', exitPopapKey)
    document.addEventListener('click', exitPopapClick)
}

//  Функция закрытия попапа
export function exitPopap(popap) {
    popap.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', exitPopapKey)
}

// Функция закрытия попапа через ESC
function exitPopapKey(evt) {
    if (evt.key === 'Escape' ) {
        const popapIsOpen = document.querySelector('.popup_is-opened')
        exitPopap(popapIsOpen)
    }
}

// Функция закрытия попапа через кнопку и оверлея
function exitPopapClick(evt) {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {       
        const popapIsOpen = document.querySelector('.popup_is-opened')
        exitPopap(popapIsOpen)
    }
}

