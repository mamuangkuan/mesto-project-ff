// Подключение файла стилей
import "./pages/index.css";
// Подключений функций создания, удаления и лайка карточки
import { createNewCard, removeCard, likeCard } from "./components/card.js";
//Подключаем апи
import {
  getInitialCards,
  getProfileData,
  updateProfile,
  updateAvatar,
  addNewPlaceToServer,
  deleteCardFromServer,
} from "./components/api.js";
// Подключений функций создания, удаления и лайка карточки
import {
  enableValidation,
  clearValidation,
  validationConfig
} from "./components/validation.js";
// Подключений функций открытия и закрытия попапов
import {
  openModal,
  closeModal,
  closePopupByOverlay,
} from "./components/modal.js";

//СПИСОК ПЕРЕМЕННЫХ И КОНСТАНТ
//Список карточек
const listOfCards = document.querySelector(".places__list");
//Модальное окно добавления нового места
const modalAddNewPlace = document.querySelector(".popup_type_new-card");
//Кнопка добавления нового места
const modalAddNewPlaceButton = document.querySelector(".profile__add-button");
//Модальное окно редактирования профиля
const modalProfile = document.querySelector(".popup_type_edit");
//Кнопка редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
//Форма редактирования профиля
const formProfile = document.forms["edit-profile"];
//Поле "Имя" формы редактирования профиля
const nameInput = formProfile.elements.name;
//Поле "Должность" формы редактирования профиля
const jobInput = formProfile.elements.description;
//Кликабельная аватарка
const avatarButton = document.querySelector(".profile__image");
//Модальное окно редактирования аватара
const modalAvatarEdit = document.querySelector(".popup_type_avatar");
//Форма редактирования аватара
const formAvatar = document.forms["avatar-edit"];
//Поле "Адрес картинки" формы редактирования аватара
const avatarUrlInput = formAvatar.elements.avatarlink;
//Форма добавления нового места
const formNewPlace = document.forms["new-place"];
//Поле "Место" формы добавления нового места
const namePlaceInput = formNewPlace.elements["place-name"];
//Поле "Адрес картинки" формы добавления нового места
const imgUrlInput = formNewPlace.elements.link;
//Модальное окно большой картинки
const modalImg = document.querySelector(".popup_type_image");
//Адрес картинки для модального окна большой картинки
const modalImgUrl = modalImg.querySelector(".popup__image");
//Подпись под картинкой модального окна большой картинки
const modalImgTitle = modalImg.querySelector(".popup__caption");
//Имя профиля
const profileName = document.querySelector(".profile__title");
//Описание или "должность" профиля
const profileDescription = document.querySelector(".profile__description");
//Все попапы на странице
const allModals = document.querySelectorAll(".popup");

//Запрашиваем с сервера данные профиля и список карточек
Promise.all([getProfileData(), getInitialCards()])
  .then(([profileData, initialCards]) => {
    //заполняем профиль данными с сервера
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    document.querySelector(".profile__image").style[
      "background-image"
    ] = `url(${profileData.avatar})`;
    //Выводим карточки мест
    initialCards.forEach(function (item) {
      listOfCards.append(
        createNewCard(
          item,
          removeCard,
          openBigImgModal,
          likeCard,
          profileData,
          deleteCardFromServer
        )
      );
    });
  })
  .catch((error) => {
    console.log(`${error} ответил нам сервер и отказался что-либо делать`);
  });

//Обработчик открытия модального окна профиля
profileEditButton.addEventListener("click", function () {
  //Вставляем в поля модального окна профиля текущее значение из шаблона
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  //Очистка валидации
  clearValidation(formProfile, validationConfig);
  //Открываем модальное окно профиля
  openModal(modalProfile);
});

//Функция редактирования профиля
function submitFormProfile(evt) {
  //Скидываем дефолтное поведение для сабмита
  evt.preventDefault();
  //Формируем массив для передачи функции обновления профиля
  const newProfileData = {
    name: nameInput.value,
    about: jobInput.value,
  };
  //Показываем загрузку
  const submitButton = evt.submitter;
  showLoading(true, submitButton);
  //Обновляем данные на сервере
  updateProfile(newProfileData)
    .then(() => {
      //Присваиваем HTML-блоку с информацией о профиле данные из формы
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      //Закрываем окно
      closeModal(modalProfile);
    })
    .catch((error) => {
      console.log(`${error} ответил нам сервер и отказался что-либо делать`);
    })
    .finally(() => {
      showLoading(false, submitButton);
    });
}

// Обработчик самбита для редакитрования профиля
formProfile.addEventListener("submit", submitFormProfile);

// Обработчик открытия модального окна редактирования аватара
avatarButton.addEventListener("click", function () {
  //Очистка валидации
  clearValidation(formAvatar, validationConfig);
  //Открываем модальное окно
  openModal(modalAvatarEdit);
});

//Функция обновления автара
function submitNewAvatar(evt) {
  //Скидываем дефолтное поведение для сабмита
  evt.preventDefault();
  //Присваиваем переменной  адрес новой аватарки и передаем в функцию
  const newAvatarImg = { avatar: avatarUrlInput.value };
  //Показываем загрузку
  const submitButton = evt.submitter;
  showLoading(true, submitButton);
  //Обновляем картинку аватарки на сервере
  updateAvatar(newAvatarImg)
    .then(() => {
      //Добавляем аватарку в шаблон значеним из формы
      avatarButton.style["background-image"] = `url(${avatarUrlInput.value})`;
      //Закрываем окно
      closeModal(modalAvatarEdit);
    })
    .catch((error) => {
      console.log(`${error} ответил нам сервер и отказался что-либо делать`);
    })
    .finally(() => {
      showLoading(false, submitButton);
    });
}

//Обработчик самбита обновления аватарки
formAvatar.addEventListener("submit", submitNewAvatar);

//Обработчик открытия модального окна добавления нового места
modalAddNewPlaceButton.addEventListener("click", function () {
  //Очистка валидации
  clearValidation(formNewPlace, validationConfig);
  //Открываем модальное окно
  openModal(modalAddNewPlace);
});

// Обработчик формы добавления нового места
formNewPlace.addEventListener("submit", function (evt) {
  //Скидываем дефолтное поведение для сабмита
  evt.preventDefault();
  //Формируем массив для перадачи в функцию добавления createNewCard
  const newCard = {
    name: namePlaceInput.value,
    link: imgUrlInput.value,
  };
  //Показываем загрузку
  const submitButton = evt.submitter;
  showLoading(true, submitButton);
  //Отправляем данные новой карточки на сервер
  addNewPlaceToServer(newCard)
    .then((res) => {
      listOfCards.prepend(
        createNewCard(
          res,
          removeCard,
          openBigImgModal,
          likeCard,
          res.owner,
          deleteCardFromServer
        )
      );
      //Очищаем форму после сохранения полей
      formNewPlace.reset();
      // закрываем модальное окно после сохранения
      closeModal(modalAddNewPlace);
    })
    .catch((error) => {
      console.log(`${error} ответил нам сервер и отказался что-либо делать`);
    })
    .finally(() => {
      showLoading(false, submitButton);
    });
});

//Функция заполнения полей большой картинки данными из функции создания карточки
function openBigImgModal(item) {
  // Заполняем переменные данными
  modalImgUrl.src = item.link;
  modalImgUrl.alt = item.name;
  modalImgTitle.textContent = item.name;
  //Открываем модальное окно с большой картинкой
  openModal(modalImg);
}

//Закрытие всех попаов кликом на крестик
allModals.forEach((modalWindow) => {
  modalWindow.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(modalWindow);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(modalWindow);
    }
  });
});

//Обработчик закрытия модального окна добавления нового места по клику на оверлей
modalAddNewPlace.addEventListener("click", closePopupByOverlay);

//Обработчик закрытия модального окна профиля по клику на оверлей
modalProfile.addEventListener("click", closePopupByOverlay);

//Обработчик закрытия модального окна большой картинки по клику на оверлей
modalImg.addEventListener("click", closePopupByOverlay);

//Обработчик закрытия модального окна редактирования аватара по клику на оверлей
modalAvatarEdit.addEventListener("click", closePopupByOverlay);

//Активируем функции валидации полей форм
enableValidation(validationConfig);

//Функция отображения статуса сохранения на кнопках
function showLoading(isLoading, submitButton) {
  if (isLoading === true) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = "Сохранить";
  }
}
