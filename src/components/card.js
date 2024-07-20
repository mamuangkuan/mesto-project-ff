import { deleteCardFromServer, putLike, removeLike } from "./api.js";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createNewCard(
  item,
  removeCard,
  openBigImgModal,
  likeCard,
  profileData,
  deleteCardFromServer
) {
  //Клонирование экземпляра карточки
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  //Кнопка удаления карточки
  const removeButton = cardItem.querySelector(".card__delete-button");
  //Кнопка лайка
  const likeButton = cardItem.querySelector(".card__like-button");
  //Блок с картинкой
  const cardImageUrl = cardItem.querySelector(".card__image");
  //Заголовок картинки
  const cardTitle = cardItem.querySelector(".card__title");
  //Заполняем переменные данными
  cardImageUrl.src = item.link;
  cardTitle.alt = item.name;
  cardTitle.textContent = item.name;
  //Обработчик открытия большой картинки
  cardImageUrl.addEventListener("click", function () {
    openBigImgModal(item);
  });
  //Обработчик кнопки удаления карточки
  removeButton.addEventListener("click", function (evt) {
    //Удаляем карточку из DOM-дерева
    removeCard(evt);
    //Удаяем карточку с сервера
    deleteCardFromServer(item._id);
  });
  //Обработчик кнопки лайка
  likeButton.addEventListener("click", function (evt) {
    likeCard(evt, item, cardItem);
  });
  //Счетчик лайков
  cardItem.querySelector(".like__counter").textContent = item.likes.length;
  //Выделяем лайкнутые карточки
  if (item.likes.some((like) => like._id === profileData._id)) {
    likeButton.classList.toggle("card__like-button_is-active");
  }
  //Скрытие корзины для чужих карточек
  if (!(profileData._id === item.owner._id)) {
    removeButton.style = ["display:none"];
  }
  //Возврат готового результата
  return cardItem;
}

//Функция удаления карточки
export function removeCard(evt) {
  evt.target.closest(".places__item").remove();
}

//Функция лайка карточки
export function likeCard(evt, item, cardItem) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    removeLike(item._id).then((res) => {
      evt.target.classList.remove("card__like-button_is-active");
      cardItem.querySelector(".like__counter").textContent = res.likes.length;
    });
  } else {
    putLike(item._id).then((res) => {
      evt.target.classList.add("card__like-button_is-active");
      cardItem.querySelector(".like__counter").textContent = res.likes.length;
    });
  }
}
