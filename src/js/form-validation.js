const listInputs = document.querySelectorAll('.dados input');
const activeClass = 'active';

const types = {
  numero: {
    regex: [
      /^[\d\s]+$/,
      /^(?:(?:[0-9][-.\s]?){4}[-.\s]?){3}(?:[0-9][-.\s]?){4}$/,
    ],
    message: ['Wrong format, numbers only', 'Numbers are missing'],
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

const form = (input, type, changeValueTarget, maxCharacter) => {
  const targetToApplyInputValue =
    changeValueTarget && document.querySelector(changeValueTarget);

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
      input.classList.remove('error');
      input.nextElementSibling.classList.remove(activeClass);
      return true;
    }
  }

  function alterDetailsCard() {
    targetToApplyInputValue.innerText = input.value;
  }

  let prevValueInput;
  function maxCharacterInput() {
    const cleanValue = input.value.replace(/\s+/g, '');

    if (cleanValue.length <= maxCharacter) prevValueInput = input.value;
    else input.value = prevValueInput;
  }

  function handleChange() {
    if (maxCharacter) maxCharacterInput();
    if (error) validate();
    if (targetToApplyInputValue) alterDetailsCard();
  }

  function addEvents() {
    input.addEventListener('blur', validate);
    input.addEventListener('input', handleChange);
  }
  addEvents();

  return { validate: () => validate(input.value) };
};

const nome = form(document.querySelector('#nome'), null, '.container-dados p');
const numero = form(
  document.querySelector('#numero'),
  'numero',
  '.digitos',
  16,
);
const mes = form(document.querySelector('#mes'), 'mes');
const ano = form(document.querySelector('#ano'), 'ano');
const cvc = form(document.querySelector('#cvc'), 'cvc', '.cvc', 3);

const fields = [nome, numero, mes, ano, cvc];
function handleSubmit(event) {
  event.preventDefault();
  const validation = fields.map((field) => (field.validate() ? true : false));

  if (!validation.includes(false)) {
    console.log('validado!');
  }
}

const formElement = document.querySelector('form');
formElement.addEventListener('submit', handleSubmit);
