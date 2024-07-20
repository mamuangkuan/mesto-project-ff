//Конфиг валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Функция, которая добавляет класс с ошибкой
const showInputError = (formProfile, inputElement, errorMessage) => {
  const errorElement = formProfile.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputErrorClass);
};

//Проверка валидности поля
const isValid = (formProfile, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formProfile, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formProfile, inputElement);
  }
};

//Назначение листнера всем полям
const setEventListeners = (formProfile) => {
  const inputList = Array.from(
    formProfile.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formProfile.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formProfile, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Провка наличия невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция проверяет статус кнопки - активаня или неактивная, если есть хоть 1 невалидные инпут
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Функция валидации полей
export const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formProfile) => {
    setEventListeners(formProfile);
  });
};

// Удаление класса с ошибкой
const hideInputError = (formProfile, inputElement) => {
  const errorElement = formProfile.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.errorClass);
  errorElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
};

// Функция удаляет все ошибки валидации и делает кнопку неактивной без валидных данных
export const clearValidation = (formProfile, validationConfig) => {
  const formsInput = Array.from(
    formProfile.querySelectorAll(validationConfig.inputSelector)
  );
  formsInput.forEach((input) => {
    hideInputError(formProfile, input, validationConfig);
  });
  const submitButton = formProfile.querySelector(
    validationConfig.submitButtonSelector
  );
  submitButton.disabled = true;
  submitButton.classList.add(validationConfig.inactiveButtonClass);
};
