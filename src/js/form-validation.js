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
      input.nextElementSibling.classList.remove(activeClass);
      return true;
    }
  }

  function handleChange() {
    if (error) validate();
  }

  function addEvents() {
    input.addEventListener('blur', validate);
    input.addEventListener('input', handleChange);
  }

  function inputCreate(target) {
    input = target;
  }

  return { inputCreate, addEvents, validate };
};

const numero = form('numero');
numero.inputCreate(document.querySelector('#numero'));
numero.addEvents();

const nome = form();
nome.inputCreate(document.querySelector('#nome'));
nome.addEvents();

const mes = form('mes');
mes.inputCreate(document.querySelector('#mes'));
mes.addEvents();

const ano = form('ano');
ano.inputCreate(document.querySelector('#ano'));
ano.addEvents();

const cvc = form();
cvc.inputCreate(document.querySelector('#cvc'));
cvc.addEvents();
