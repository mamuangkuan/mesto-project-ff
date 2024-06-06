// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const listOfCards = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createNewCard(item, removeCard) {
  //клонируем экземпляр карточки
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);

  //создаем переменную с кнопкой удаления карточки
  const removeButton = cardItem.querySelector(".card__delete-button");

  //берем значения из массива с карточками
  cardItem.querySelector(".card__image").src = item.link;
  cardItem.querySelector(".card__image").alt = item.name;
  cardItem.querySelector(".card__title").textContent = item.name;

  //добавляем обработчик для кнопки удаления
  removeButton.addEventListener("click", removeCard);

  //возвращаем готовый результат
  return cardItem;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  evt.target.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const cardItem = createNewCard(item, removeCard);
  listOfCards.append(cardItem);
});
