// Функция открытия модального окна
export function openModal(item) {
  item.classList.add("popup_is-opened");
}

// Функция закрытия модального окна
export function closeModal(item) {
  item.classList.remove("popup_is-opened");
}