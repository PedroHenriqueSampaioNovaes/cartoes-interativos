import formatData from './format-data.js';

const types = {
  numero: {
    regex: [
      /^[\d\s]+$/,
      /^(?:(?:[0-9][-.\s]?){4}[-.\s]?){3}(?:[0-9][-.\s]?){4}$/,
    ],
    message: ['Wrong format, numbers only', 'Numbers are missing'],
    format: /(\d{4})(\d{4})(\d{4})(\d{4})/g,
  },
  mes: {
    regex: [/^\d{2}$/],
    message: ['Just use two numbers'],
  },
  ano: {
    regex: [/^\d{2}$/],
    message: ['Just use two numbers'],
  },
  cvc: {
    regex: [/^\d{3}$/],
    message: ['Just use three numbers'],
  },
};

const validationForm = (input, type, changeValueTarget, maxCharacter) => {
  input = document.querySelector(input);
  const cardElement =
    changeValueTarget && document.querySelector(changeValueTarget);
  const activeClass = 'active';

  function activeError(message) {
    const span = input.nextElementSibling;
    input.classList.add('error');
    span.innerText = message;
    span.classList.add(activeClass);
  }

  function validRegex() {
    return types[type].regex.every((reg, i) => {
      if (!reg.test(input.value)) {
        activeError(types[type].message[i]);
        return false;
      }
      return true;
    });
  }

  let valid = false;
  let error = false;
  function validate() {
    if (type === false) return true;
    if (input.value.length === 0) {
      activeError(`Can't be blank`);
      error = true;
      return false;
    } else if (types[type] && !validRegex()) {
      error = true;
      return false;
    } else {
      valid = true;
      input.classList.remove('error');
      input.nextElementSibling.classList.remove(activeClass);
      return true;
    }
  }

  function alterDetailsCard() {
    if (valid && types[type] && types[type].format) {
      cardElement.innerText = formatData(input.value, types[type].format);
    } else {
      cardElement.innerText = input.value;
    }
  }

  let prevValueInput;
  function maxCharacterInput() {
    const cleanValue = input.value.replace(/\s+/g, '');

    if (cleanValue.length <= maxCharacter) prevValueInput = input.value;
    else input.value = prevValueInput;
  }

  function handleBlur() {
    validate();
    if (cardElement) alterDetailsCard();
  }

  function handleChange() {
    if (maxCharacter) maxCharacterInput();
    if (error) validate();
    if (cardElement) alterDetailsCard();
  }

  function addEvents() {
    input.addEventListener('blur', handleBlur);
    input.addEventListener('input', handleChange);
  }
  addEvents();

  return { validate: () => validate() };
};
export default validationForm;
