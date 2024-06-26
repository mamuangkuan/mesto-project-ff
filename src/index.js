// Подключение файла стилей
import "./pages/index.css";
// Подключений функций создания, удаления и лайка карточки
import { createNewCard, removeCard, likeCard } from "./components/card.js";
// Подключений функций открытия и закрытия попапов
import { openModal, closeModal } from "./components/modal.js";
// Подключение массива данных для карточек
import { initialCards } from "./components/cards.js";

// СПИСОК ПЕРЕМЕННЫХ И КОНСТАНТ
// Список карточек
const listOfCards = document.querySelector(".places__list");
// Модальное окно добавления нового места
const modalAddNewPlace = document.querySelector(".popup_type_new-card");
// Кнопка добавления нового места
const modalAddNewPlaceButton = document.querySelector(".profile__add-button");
// Модальное окно редактирования профиля
const modalProfile = document.querySelector(".popup_type_edit");
// Кнопка редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
// Форма редактирования профиля
const formElement = document.forms["edit-profile"];
// Поле "Имя" формы редактирования профиля
const nameInput = formElement.elements.name;
// Поле "Должность" формы редактирования профиля
const jobInput = formElement.elements.description;
// Форма добавления нового места
const formNewPlace = document.forms["new-place"];
// Поле "Место" формы добавления нового места
const namePlaceInput = formNewPlace.elements["place-name"];
// Поле "Адрес картинки" формы добавления нового места
const imgUrlInput = formNewPlace.elements.link;
// Модальное окно большой картинки
const modalImg = document.querySelector(".popup_type_image");
// Адрес картинки для модального окна большой картинки
const modalImgUrl = modalImg.querySelector(".popup__image");
// Подпись под картинкой модального окна большой картинки
const modalImgTitle = modalImg.querySelector(".popup__caption");
// Иконка закрытия большой картинки
const closeModalImg = modalImg.querySelector(".popup__close");
// Иконка закрытия модального окна профиля
const closeModalProfile = modalProfile.querySelector(".popup__close");
// Иконка закрытия модального окна добавления нового места
const closeModalAddNewPlace = modalAddNewPlace.querySelector(".popup__close");

// Вывод карточек на страницу
initialCards.forEach(function (item) {
  const cardItem = createNewCard(item, removeCard, bigImgModal, likeCard);
  listOfCards.append(cardItem);
});

// Обработчик открытия модального окна добавления нового места
modalAddNewPlaceButton.addEventListener("click", function () {
  openModal(modalAddNewPlace);
});

// Обработчик открытия модального окна профиля
profileEditButton.addEventListener("click", function () {
  openModal(modalProfile);
});

// вставляем в поля модального окна профиля текущее значение из шаблона
nameInput.value = document.querySelector(".profile__title").textContent;
jobInput.value = document.querySelector(".profile__description").textContent;

// функция редактирования профиля
function handleFormSubmit(evt) {
  // Скидываем дефолтное поведение для сабмита
  evt.preventDefault();
  // Присваиваем HTML-блоку с информацией о профиле данные из формы
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  // Закрываем окно
  closeModal(modalProfile);
}

// Обработчик самбита для редакитрования профиля
formElement.addEventListener("submit", handleFormSubmit);

// Обработчик формы добавления нового места
formNewPlace.addEventListener("submit", function (evt) {
  // скидываем дефолтное поведение для сабмита
  evt.preventDefault();
  // формируем массив для перадачи в функцию добавления createNewCard
  const newCard = {
    name: namePlaceInput.value,
    link: imgUrlInput.value,
  };
  // передаем массив в функцию, а полученные данные добавляем в начало блока карточек благодаря методу prepend
  listOfCards.prepend(
    createNewCard(newCard, removeCard, bigImgModal, likeCard)
  );
  // очищаем форму после сохранения полей
  formNewPlace.reset();
  // закрываем модальное окно после сохранения
  closeModal(modalAddNewPlace);
});

// Функция заполнения полей большой картинки данными из функции создания карточки
function bigImgModal(item) {
  // Заполняем переменные данными
  modalImgUrl.src = item.link;
  modalImgUrl.alt = item.name;
  modalImgTitle.textContent = item.name;
  // Открываем модальное окно с большой картинкой
  openModal(modalImg);
}

// Обработчик закрытия большой картинки нажатием на крестик
closeModalImg.addEventListener("click", function () {
  closeModal(modalImg);
});

// Обработчик закрытия модального окно профиля нажатием на крестик
closeModalProfile.addEventListener("click", function () {
  closeModal(modalProfile);
});

// Обработчик закрытия модального окна добавления нового места нажатием на крестик
closeModalAddNewPlace.addEventListener("click", function () {
  closeModal(modalAddNewPlace);
});

// Обработчик закрытия закрытия модальных окон по нажатию Esc
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closeModal(modalAddNewPlace);
    closeModal(modalProfile);
    closeModal(modalImg);
  }
});

// Обработчик закрытия модального окна добавления нового места по клику на оверлей
modalAddNewPlace.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(modalAddNewPlace);
  }
});

// Обработчик закрытия модального окна профиля по клику на оверлей
modalProfile.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(modalProfile);
  }
});

// Обработчик закрытия модального окна большой картинки по клику на оверлей
modalImg.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(modalImg);
  }
});