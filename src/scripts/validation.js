// todo: отчитстку полей при закрытии попапа без сохранения

const showInputError = (config, formType, inputElement, errorMessage) => {
  const errorElement = formType.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

const hideInputError = (config, formType, inputElement) => {
  const errorElement = formType.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass); 
}

const checkInputValidity = (config, formType, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    showInputError(config, formType, inputElement, inputElement.dataset.errorPatternMessage)
  } else if (!inputElement.validity.valid) {
    showInputError(config, formType, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formType, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (config, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

const setEventListeners = (config, formType) => {
  const inputList = Array.from(formType.querySelectorAll(config.inputSelector));
  const buttonElement = formType.querySelector(config.buttonSelector);

  toggleButtonState(config, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(config, formType, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

export const cleanValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.buttonSelector);
  
  inputList.forEach((inputElement) => {
    hideInputError(config, formElement, inputElement);
  });
  
  toggleButtonState(config, inputList, buttonElement);
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  });
};
