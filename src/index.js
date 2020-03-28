import "./style.css";
import {serverUrl} from './js/config'
import {FormValidator} from './js/FormValidator';
import {PopupImage} from './js/PopupImage';
import {UserInfo} from './js/UserInfo';
import {Api} from './js/API';
import {Card} from './js/card';
import {CardList} from './js/CardList';
import {CardPopup} from './js/CardPopup';

const list = document.querySelector('.places-list');
const popupCardElement = document.querySelector('.popup__card');
const popupEditElement = document.querySelector('.popup__edit');
const buttonPopupEditOpen = document.querySelector('.button__edit');
const buttonPopupCardOpen = document.querySelector('.user-info__button')
const card = new Card();
const popupCard = new CardPopup(popupCardElement, document.forms.new);

buttonPopupCardOpen.addEventListener('click', function (event) {
  popupCard.open();
});
document.forms.new.addEventListener('submit', function (event) {
  event.preventDefault();
  api.setCard(document.forms.new.elements.name.value, document.forms.new.elements.link.value)
 .then (res => cardList.addCard(res));
  popupCard.close();
  document.forms.new.reset();
});

const userInfo = new UserInfo(popupEditElement, document.forms.info);
buttonPopupEditOpen.addEventListener('click', function (event) {
  userInfo.open();
});

document.forms.info.addEventListener('submit', function (event) {
  event.preventDefault();
  api.updateProfile(document.forms.info.elements.nameinfo.value, document.forms.info.elements.job.value)
  .then(res => userInfo.updateUserInfo(res));
  userInfo.close();
});

const validateFormCard = new FormValidator(document.forms.new);
const validateFormEdit = new FormValidator(document.forms.info);
validateFormCard.setEventListeners();
validateFormEdit.setEventListeners();

function onRootClick(event){
  event.preventDefault();
  const popupImage = new PopupImage(event)
  popupImage.popupBigImageOpen(event);
}
document.querySelector(".root").addEventListener('click', onRootClick);

const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort8',
  headers: {
    authorization: 'c3ab1d6f-f7de-4703-a8ca-26881c8253c8',
    'Content-Type': 'application/json'
  }
});
 
let cardList = new CardList(list, card, api, userInfo);

Promise.all([
    api.getInitialCards(),
    api.setProfile()
  ])
  .then(([initialCards, user]) => {
userInfo.setUserInfo(user._id, user.name, user.about, user.avatar);
userInfo.updateUserInfo();
cardList.setCards(initialCards);
cardList.render();
  })
