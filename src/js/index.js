import validationForm from './validation-form.js';
import sendForm from './send-form.js';

const nome = validationForm('#nome', null, '.container-dados p');
const numero = validationForm('#numero', 'numero', '.digitos', 16);
const mes = validationForm('#mes', 'mes');
const ano = validationForm('#ano', 'ano');
const cvc = validationForm('#cvc', 'cvc', '.cvc', 3);

sendForm('form', '.data', '.regist', [nome, numero, mes, ano, cvc]);
