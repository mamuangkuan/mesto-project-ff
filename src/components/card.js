// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createNewCard(item, removeCard, bigImgModal, likeCard) {
  // Клонирование экземпляра карточки
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  // Кнопка удаления карточки
  const removeButton = cardItem.querySelector(".card__delete-button");
  // Кнопка лайка
  const likeButton = cardItem.querySelector(".card__like-button");
  // Блок с картинкой
  const cardImageUrl = cardItem.querySelector(".card__image");
  // Заголовок картинки
  const cardTitle = cardItem.querySelector(".card__title");
  // Заполняем переменные данными
  cardImageUrl.src = item.link;
  cardTitle.alt = item.name;
  cardTitle.textContent = item.name;
  // Обработчик открытия большой картинки
  cardImageUrl.addEventListener("click", function () {
    bigImgModal(item);
  });

  // Обработчик кнопки удаления карточки
  removeButton.addEventListener("click", removeCard);

  // Обработчик кнопки лайка
  likeButton.addEventListener("click", likeCard);

  // Возврат готового результата
  return cardItem;
}

// Функция удаления карточки
export function removeCard(evt) {
  evt.target.closest(".places__item").remove();
}

// Функция лайка карточки
export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}