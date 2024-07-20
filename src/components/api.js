//Конфиг для подключения и авторизации на сервере
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
  headers: {
    authorization: "9fe7d77e-0e55-443e-a94d-5fc31f24e03d",
    "Content-Type": "application/json",
  },
};
//Преобразование промиса в JSON-массив
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

//Получение списка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

//Получение данных профиля с сервера
export const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

//Обновление данных профиля на сервере
export const updateProfile = (newProfileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(newProfileData),
  })
    .then(handleResponse) 
};

//Обновление картинки аватарки на сервере
export const updateAvatar = (newAvatarImg) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(newAvatarImg),
  }).then(handleResponse);
};

//Добавление новой карточки на сервер
export const addNewPlaceToServer = (newCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCard),
  }).then(handleResponse);
};

//Удаление карточки с сервера
export const deleteCardFromServer = (itemId) => {
  return fetch(`${config.baseUrl}/cards/${itemId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

//Устанока лайка
export const putLike = (itemId) => {
  return fetch(`${config.baseUrl}/cards/likes/${itemId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

//Снятие лайка
export const removeLike = (itemId) => {
  return fetch(`${config.baseUrl}/cards/likes/${itemId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};
