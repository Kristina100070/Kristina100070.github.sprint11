export class PopupImage {
  constructor (event){
      this.event = event;
  }
  popupBigImageOpen(event){
    if (event.target.matches(".place-card__image") && !event.target.matches(".place-card__delete-icon")) {
      const currentBG = event.target.getAttribute("style");
      const imagePopup = document.createElement("div");
      const closePopup = document.createElement("img");
      const strippedSrc = currentBG.match(/url\((.*)\)/i);
    
      document.querySelector(".root").appendChild(imagePopup);
      imagePopup.setAttribute("class", "popup popup_is-opened");
    
      const imagePopupContent = document.createElement("div");
    
      imagePopup.appendChild(imagePopupContent).setAttribute("class", "popup__content");
      imagePopupContent.classList.add('popup__image');
    
      const imageInsidePopupContent = document.createElement("img");
      imagePopupContent.appendChild(imageInsidePopupContent).setAttribute("src", strippedSrc[1]);
      imageInsidePopupContent.classList.add('popup__image_big');
    
      imagePopupContent.appendChild(closePopup).setAttribute("src", "./images/close.svg");
      closePopup.setAttribute("class", "popup__close");
      closePopup.addEventListener("click", (event) => {
      event.target.closest(".popup_is-opened").classList.remove("popup_is-opened")
      });
    }
  } 
}