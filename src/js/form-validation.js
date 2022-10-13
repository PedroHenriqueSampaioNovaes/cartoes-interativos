const listInputs = document.querySelectorAll('.dados input');
const activeClass = 'active';

const types = {
  numero: {
    regex: /^(?:[0-9]{4}[-.\s]?){3}[0-9]{4}$/,
    message: 'Wrong format, numbers only',
  },
  mes: {
    regex: /^\d{2}$/,
    message: 'Just use two numbers',
  },
  ano: {
    regex: /^\d{2}$/,
    message: 'Just use two numbers',
  },
  cvc: {
    regex: /^\d{3}$/,
    message: 'Just use three numbers',
  },
};

function activeError(input, message) {
  input.classList.add('error');
  const span = input.nextElementSibling;
  span.innerText = message;
  span.classList.add(activeClass);
}

const form = (type) => {
  let input;
  let error = false;
  const cardReplace = document.querySelector('.digitos');
  const cardName = document.querySelector('.container-dados p');

  function validate() {
    if (type === false) return true;
    if (input.value.length === 0) {
      activeError(input, `Can't be blank`);
      error = true;
      return false;
    } else if (types[type] && !types[type].regex.test(input.value)) {
      activeError(input, types[type].message);
      error = true;
      return false;
    } else {
      input.classList.remove('error');
      input.nextElementSibling.classList.remove(activeClass);
      return true;
    }
  }

  function handleChange({ currentTarget }) {
    if (error) validate();

    const cleanValue = input.value.replace(/\s+/g, '');
    if (type === 'numero' && cleanValue.length <= 16) {
      cardReplace.innerText = input.value;
    }

    cardName.innerText = currentTarget.value;
  }

  function addEvents() {
    input.addEventListener('blur', validate);
    input.addEventListener('input', handleChange);
  }

  function inputCreate(target) {
    input = target;
    addEvents();
  }

  return { inputCreate, validate: () => validate(input.value) };
};

const numero = form('numero');
numero.inputCreate(document.querySelector('#numero'));

const nome = form();
nome.inputCreate(document.querySelector('#nome'));

const mes = form('mes');
mes.inputCreate(document.querySelector('#mes'));

const ano = form('ano');
ano.inputCreate(document.querySelector('#ano'));

const cvc = form('cvc');
cvc.inputCreate(document.querySelector('#cvc'));

function handleSubmit(event) {
  event.preventDefault();

  if (
    nome.validate() &&
    numero.validate() &&
    mes.validate() &&
    ano.validate() &&
    cvc.validate()
  ) {
    console.log('validado!');
  }
}

const formElement = document.querySelector('form');
formElement.addEventListener('submit', handleSubmit);
