export class Card {
  like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
  }
  create(data) {
    const container = document.createElement('div');
    const template = `<div data-card-id="${data._id}" class="place-card"> 
   <div class="place-card__image" style="background-image: url(${data.link})"> 
     <button class="place-card__delete-icon"></button>
   </div>
   <div class="place-card__description">
     <h3 class="place-card__name">${data.name}</h3>
     <div class="place-card__like">
     <button class="place-card__like-icon"></button>
     <p class="place-card__like-sum"></p>
     </div>
   </div>
 </div>`
    container.insertAdjacentHTML('beforeend', template);
    return container;
  }
  setLike(element) {
    element.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
  }
  updateLikesCount(cardElement, count) {
    cardElement.querySelector('.place-card__like-sum').textContent = count;
  }
}
