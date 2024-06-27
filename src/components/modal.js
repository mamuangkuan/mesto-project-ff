// Функция открытия модального окна
export function openModal(item) {
  item.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

// Функция закрытия модального окна
export function closeModal(item) {
  item.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

// Функция закрытия модальных окон нажатием клавиши ESC
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

// Функция закрытия модальных окон кликом по оверлею
export function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}
