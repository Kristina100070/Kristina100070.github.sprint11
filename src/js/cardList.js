export class CardList {
    constructor(container, card, api, userInfo) {
      this.container = container;
      this.card = card;
      this.api = api;
      this.userInfo = userInfo;
      container.addEventListener('click', this.card.like.bind(this));
      container.addEventListener('click', this.card.remove.bind(this));
    }

    addCard(card) {
      const cardElement = this.card.create(card);
      this.card.updateLikesCount(cardElement, card.likes.length);
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
  }