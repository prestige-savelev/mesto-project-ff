// Процесс загрузки
export function renderLoading(isLoading, submitButton) {
    if (isLoading) {
        submitButton.innerText = 'Сохранение..';
    } else {
        submitButton.innerText = 'Сохранить';
    } 
}