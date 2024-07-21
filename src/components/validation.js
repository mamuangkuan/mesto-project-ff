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
const showInputError = (
  formProfile,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formProfile.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputErrorClass);
};

// Удаление класса с ошибкой
const hideInputError = (formProfile, inputElement, validationConfig) => {
  const errorElement = formProfile.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.errorClass);
  errorElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
};

//Проверка валидности поля
const isValid = (formProfile, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formProfile,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formProfile, inputElement, validationConfig);
  }
};

// Функция валидации полей
export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formProfile) => {
    setEventListeners(formProfile, validationConfig);
  });
};

//Назначение листнера всем полям
const setEventListeners = (formProfile, validationConfig) => {
  const inputList = Array.from(
    formProfile.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formProfile.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formProfile, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
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
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
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
