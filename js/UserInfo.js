class UserInfo extends Popup {
    constructor (element, form) {
      super(element);
      this.form = form;
      this.userName = form.elements.nameinfo;
      this.userJob = form.elements.job;
      this.name = document.querySelector('.user-info__name');
      this.about = document.querySelector('.user-info__job');
      this.photo = document.querySelector('.user-info__photo');
      
      
    };
    setUserInfo(_id, name, about, avatar) {
    this._id = _id;
    this.name.textContent = name;
    this.about.textContent = about;
    this.photo.style.backgroundImage = 'url(' + avatar + ')';
    
    }
    updateUserInfo(info) {
      this.name.textContent = this.userName.value;
      this.about.textContent = this.userJob.value;
      }
  }