const sendForm = (
  formElement,
  hideContentElement,
  showContentElement,
  fields,
) => {
  const form = document.querySelector(formElement);
  const hideContent = document.querySelector(hideContentElement);
  const showContent = document.querySelector(showContentElement);

  function handleSubmit(event) {
    event.preventDefault();
    const validation = fields.map((field) => (field.validate() ? true : false));

    if (!validation.includes(false)) {
      hideContent.remove();
      showContent.classList.add('active');
    }
  }
  form.addEventListener('submit', handleSubmit);
};
export default sendForm;
