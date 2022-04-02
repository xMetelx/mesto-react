export const validationConfig = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup_type_error',
  errorClass: 'popup__inputs-error_active'
};

export const popupEditProfile = document.querySelector('.popup_edit');
export const popupAddCard = document.querySelector('.popup_add-card');
export const popupEditButton = document.querySelector('.profile__pen-button');
export const popupAddButton = document.querySelector('.profile__add');
export const elementsList = document.querySelector('.elements__cards');
export const templateElement = document.querySelector('.element-template');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');
export const popupOpenPicture = document.querySelector('.popup_open-photo');
export const nameEditProfile = document.querySelector('.popup__input_name_name');
export const jobEditProfile = document.querySelector('.popup__input_name_job');
export const popupEditAvatar = document.querySelector('.popup_change-avatar');
export const avatarEditButton = document.querySelector('.profile__avatar');
export const profilePhoto = document.querySelector('.profile__photo');
export const deleteCardForm = document.querySelector('.popup_delete-card');