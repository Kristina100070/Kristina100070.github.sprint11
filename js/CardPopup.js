class CardPopup extends Popup {
    constructor(element, form) {
      super(element);
      this.form = form;
    }
    getFormData() {
     return {
      name: this.form.elements.name.value,
      link: this.form.elements.link.value
      }
    } 
  }