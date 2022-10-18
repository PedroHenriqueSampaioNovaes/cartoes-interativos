import validationForm from './validation-form.js';
import sendForm from './send-form.js';

const nome = validationForm('#nome', null, '.wrapper-dados p');
const numero = validationForm('#numero', 'numero', '.digits', 16);
const month = validationForm('#mes', 'mes', '.month');
const year = validationForm('#ano', 'ano', '.year');
const cvc = validationForm('#cvc', 'cvc', '.cvc', 3);

sendForm('form', '.data', '.regist', [nome, numero, month, year, cvc]);
