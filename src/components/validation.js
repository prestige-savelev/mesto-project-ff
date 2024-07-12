// Валидация

// Функция проверки кнопки 
const toggleButtonState = (inputList, submitButtonSelector, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        submitButtonSelector.disabled = 'true';
        submitButtonSelector.classList.add(inactiveButtonClass)
    } else {
        submitButtonSelector.disabled = false;
        submitButtonSelector.classList.remove(inactiveButtonClass)
    }
}

// Функция обхода полей
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
}

//   Функция показа ошибки
const showError = (form, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass)
    errorElement.textContent = errorMessage
};

// Функция скрытия ошибки
const hideError = (formSelector, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass)
    errorElement.classList.remove(errorClass)
    errorElement.textContent = ''
};

// Функция проверки ошибок и скрытия
export const checkInputValidity = (formSelector, inputElement, inputErrorClass, errorClass) => {
    // Проверка на паттерн
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity('')
    }
    // Проверка валидности
    if (!inputElement.validity.valid) {
        showError(formSelector, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
    } else {
        hideError(formSelector, inputElement, inputErrorClass, errorClass)
    }   
};

export const clearValidation = (formSelector, validationConfig) => {
    const submitButtonSelector = formSelector.querySelector(validationConfig.submitButtonSelector)
    const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector))
    inputList.forEach((inputElemet) => {
        hideError(formSelector, inputElemet, validationConfig.inputErrorClass, validationConfig.errorClass)
        toggleButtonState(inputList, submitButtonSelector, validationConfig.inactiveButtonClass)
    })
}

// Функция обработчика полей
const setEventListeners = (formSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass, inputSelector) => {
    const buttonElement = formSelector.querySelector(submitButtonSelector);
    const inputList = Array.from(formSelector.querySelectorAll(inputSelector))
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    formSelector.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
        checkInputValidity(formSelector, inputElement, inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    })
}

// Функция валидирования всех полей 
export const enableValidation = ({formSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass, inputSelector}) => {
    const form = Array.from(document.querySelectorAll(formSelector))
    form.forEach((formItem) => {
        setEventListeners(formItem, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass, inputSelector)
    })
}


// Доделать функцию очистки