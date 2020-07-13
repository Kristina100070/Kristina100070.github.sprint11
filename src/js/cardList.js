export class CardList {
    constructor(container, card, api, userInfo) {
      this.container = container;
      this.card = card;
      this.api = api;
      this.userInfo = userInfo;
      container.addEventListener('click', this.eventhandler.bind(this));
    }
 
    addCard(card) {
      const cardElement = this.card.create(card);
      this.card.updateLikesCount(cardElement, card.likes.length);
      if (!this.needLike(card)) {
        this.card.setLike(cardElement);
      }
      if (card.owner._id === this.userInfo._id) {
        cardElement.querySelector('.place-card__delete-icon').setAttribute('style', 'display: block');
      }
      this.container.appendChild(cardElement);    
    }
    setCards(initCards) {
      this.initCards = initCards;
    }
    render(){
      for (const data of this.initCards){
        this.addCard(data) 
      }
    }
    needLike(card) {
      return (!card.likes.find((like) => like._id === this.userInfo._id))
     }
    eventhandler(event) {
      const cardId = event.target.closest('.place-card').dataset.cardId;
      const card = this.initCards.find(card => card._id === cardId);
      if(event.target.classList.contains('place-card__like-icon')) {
        if ( this.needLike(card)) {
          this.api.like(card._id)
          .then((updatedCard) => {
           card.likes = updatedCard.likes;
           this.card.like(event);
           this.card.updateLikesCount(event.target.closest('.place-card'), updatedCard.likes.length)
          });
        } else {
          this.api.dislike(card._id)
          .then((updatedCard) => {
            card.likes = updatedCard.likes;
            this.card.like(event);
            this.card.updateLikesCount(event.target.closest('.place-card'), updatedCard.likes.length)});
        }
      }
      if (event.target.classList.contains('place-card__delete-icon')) {
        const cardId = event.target.closest('.place-card').dataset.cardId;
        const card = this.initCards.find(card => card._id === cardId);
        this.api.deleteCard(card._id) 
        
        .then((res) => {
          this.container.removeChild(this.container.querySelector(`[data-card-id="${cardId}"]`));
        });
        
      }
    }
}