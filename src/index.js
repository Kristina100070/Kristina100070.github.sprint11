import "./style.css";
import {serverUrl} from './js/config'
import {FormValidator} from './js/FormValidator';
import {PopupImage} from './js/PopupImage';
import {UserInfo} from './js/UserInfo';
import {Api} from './js/API';
import {Card} from './js/card';
import {CardList} from './js/CardList';
import {CardPopup} from './js/CardPopup';
import {PopupAvatar} from './js/PopupAvatar';

const list = document.querySelector('.places-list');

const popupCardElement = document.querySelector('.popup__card');
const popupEditElement = document.querySelector('.popup__edit');
const popupAvatarElement = document.querySelector('.popup__avatar');


const buttonPopupEditOpen = document.querySelector('.button__edit');
const buttonPopupCardOpen = document.querySelector('.user-info__button');

const popupButtonAvatar = document.querySelector('.user-info__photo');

const card = new Card();
const popupCard = new CardPopup(popupCardElement, document.forms.new);

buttonPopupCardOpen.addEventListener('click', function (event) {
  popupCard.open();
});


const formCard = document.querySelector('.popup__form_card');
const formCardName = document.querySelector('.popup__card_name');
const formCardLink = document.querySelector('.popup__card_link');

formCard.addEventListener('submit', function (event) {
  event.preventDefault();
  api.setCard(formCardName.value, formCardLink.value)
 .then (res => cardList.addCard(res));
  popupCard.close();
  formCard.reset();
});

const userInfo = new UserInfo(popupEditElement, document.forms.info);
buttonPopupEditOpen.addEventListener('click', function (event) {
  userInfo.open();
});

const formInfo = document.querySelector('.popup__form_info');
const formInfoName = document.querySelector('.popup__input_type_nameinfo');
const formInfoJob = document.querySelector('.popup__input_type_job');

formInfo.addEventListener('submit', function (event) {
  event.preventDefault();
  api.updateProfile(formInfoName.value, formInfoJob.value)
  .then(res => userInfo.updateUserInfo(res));
  userInfo.close();
});

const validateFormCard = new FormValidator(formCard);
const validateFormEdit = new FormValidator(formInfo);
const validateFormAvatar = new FormValidator(document.forms.avatar);
validateFormCard.setEventListeners();
validateFormEdit.setEventListeners();
validateFormAvatar.setEventListeners();

function onRootClick(event){
  event.preventDefault();
  const popupImage = new PopupImage(event)
  popupImage.popupBigImageOpen(event);
}
document.querySelector(".root").addEventListener('click', onRootClick);

const api = new Api({
  baseUrl: serverUrl,
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

  const popupAvatar = new PopupAvatar(popupAvatarElement, document.forms.avatar);
 
  popupButtonAvatar.addEventListener('click', function (event) {
    popupAvatar.open();
  });
  document.forms.avatar.addEventListener('submit', function (event) {
    event.preventDefault();
    api.updateAvatar(document.forms.avatar.elements.link.value)
   .then (res => popupButtonAvatar.style.backgroundImage = `url(${res.avatar})`)
    popupAvatar.close();
    document.forms.avatar.reset();
  });  