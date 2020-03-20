const list = document.querySelector('.places-list');
const popupCardElement = document.querySelector('.popup__card');
const popupEditElement = document.querySelector('.popup__edit');
const buttonPopupEditOpen = document.querySelector('.button__edit');
const buttonPopupCardOpen = document.querySelector('.user-info__button')
const popupButtonCard = document.querySelector('.popup__button');
const popupButtonEdit = document.querySelector('.popup__button_info');

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

const ERROR_MESSAGES = {
  typeMismatch: 'Здесь должна быть ссылка',
  tooShort: 'Должно быть от 2 до 30 символов',
  tooLong: 'Должно быть от 2 до 30 символов',
  valueMissing: 'Это обязательное поле',
  noError: '',
};

const validateFormCard = new FormValidator(document.forms.new);
const validateFormEdit = new FormValidator(document.forms.info);
validateFormCard.setEventListeners();
validateFormEdit.setEventListeners();


document.querySelector(".root").addEventListener('click', new PopupImage(this.event).popupBigImageOpen);


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


















/**
* Здравствуйте. Редкий студент сделает 8 спринт на отлично, молодцы.


* Вы молодцы, что распределили код по классам, у каждого класса должна быть своя
* обязанность. Класс должен отвечать за одно действие
*
* Можно лучше: Старайтесь задавать переменным более понятные названия, чтобы по названию было понятно
* за что отвечает та или иная переменная, это важно для понимания того за что отвечает переменная.
*
* ====================
*
 * Весь функционал работает корректно
 * Код чистый и хорошо читается
 * Вы используете логические группировки операций
 * У вас нет дублирование кода
 *  Вы не используете небезопасный innerHtml
 *  Вы используете делегирование

  * можно лучше: избегайте сложных условий и большой вложенности в условии. Чем сложнее условие, чем больше
  * вложенности в условии, тем сложнее анализировать код, сложнее искать ошибки и поддерживать такой код
  * самый простой вариант это убирать условия или блок в условии в отдельную функцию
 *
 * можно лучше: Старайтесь не объявлять большое количество переменных. Чем больше переменных, тем сложнее понимать за что они
 * отвечают и какую полезную нагрузку несут в коде. Лучше инкапсулировать(прятать) переменные в функциях.
 * В будущем вам проще будет искать ошибки и разбираться в сложных взаимосвязях
 *
 *
 *
 */