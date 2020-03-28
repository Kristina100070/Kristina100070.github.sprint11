const ERROR_MESSAGES = {
  typeMismatch: 'Здесь должна быть ссылка',
  tooShort: 'Должно быть от 2 до 30 символов',
  tooLong: 'Должно быть от 2 до 30 символов',
  valueMissing: 'Это обязательное поле',
  noError: '',
}; 

export class FormValidator {
    constructor(form) {
        this.form = form;
        this.button = form.querySelector('.popup__button');
    }
  
    checkInputValidity(input, error) {
      for (let key in ERROR_MESSAGES){
        if (input.validity[key]) {
          return error.textContent = ERROR_MESSAGES[key]
        }
      }
      error.textContent = ERROR_MESSAGES.noError;
      }
  
    setSubmitButtonState(form, button) {
     button.disabled = !form.checkValidity();
        if (!form.checkValidity())    {
          return button.classList.remove('popup__button_activ');
        }  
        return button.classList.add('popup__button_activ');
    }
  
   setEventListeners() {
     this.form.addEventListener('input', (event) => {
          this.checkInputValidity(event.target, event.target.closest('div').querySelector('.error'));
       this.setSubmitButtonState(this.form, this.button)
        });
    }
  }