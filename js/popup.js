export class Popup {
    constructor(element) {
      this.element = element;
      this.closeButton = element.querySelector('.popup__close');
    }
    open() {
      this.element.classList.add("popup_is-opened");
      this.closeButton.addEventListener('click', this.close.bind(this)); 
    }
    close() {
      this.element.classList.remove("popup_is-opened");
    }
  }