import {Popup} from './popup';
export class PopupAvatar extends Popup {
    constructor(element, form) {
      super(element);
      this.form = form;
    }
  }