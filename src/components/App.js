import React, { useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen]  = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard(false);
 }


 function handleEditProfileClick  () {
   setIsEditProfilePopupOpen(true);
}

  function handleEditAvatarClick  () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick  () {
    setisAddPlacePopupOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  return (
      <>
        <div className="page">
          <Header />
          <Main 
            onEditAvatar = {handleEditAvatarClick}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onCardClick = {handleCardClick}
          />
          <Footer />

          <PopupWithForm
            name = "edit-profile"
            title = "Редактировать профиль"
            children = {
              <div style={{overflow: 'hidden'}}>
                <input required id="input-name" type="text" name="name" minLength="2" maxLength="40" placeholder="Ваше имя" className="popup__input popup__input_name_name" /> <span className="input-name-error popup__inputs-error">Вы пропустили это поле</span>
                <input required id="input-job" type="text" name="about" minLength="2" maxLength="200" placeholder="Род занятий" className="popup__input popup__input_name_job" />
                <span className="input-job-error popup__inputs-error">Вы пропустили это поле</span>
              </div>}
              isOpen={isEditProfilePopupOpen}
              onClose = {closeAllPopups}
          />

          <PopupWithForm
            name = "add-card"
            title = "Новое место"
            children = {
               <div style={{overflow: 'hidden'}}>
                <input required id="input-title" type="text" name="title" minLength="1" maxLength="30" placeholder="Название" className="popup__input popup__input_title" /><span className="input-title-error popup__inputs-error">Вы пропустили это поле</span>
                <input required id="input-link" type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_link" />
                <span className="input-link-error popup__inputs-error">Вы пропустили это поле</span>  
              </div>
            }
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
          />

          <PopupWithForm
            name = "change-avatar"
            title = "Обновить аватар"
            children = {
            <div style={{overflow: 'hidden'}}>
              <input required id="input-avatar" type="url" name="avatar" placeholder="Ваша ссылка" className="popup__input popup__input_avatar" />
              <span className="input-avatar-error popup__inputs-error">Вы пропустили это поле</span>
              </div>
            }
            isOpen = {isEditAvatarPopupOpen}
            onClose = {closeAllPopups}
          />

          <ImagePopup 
            card = {selectedCard}
            onClose = {closeAllPopups}
          />
        </div>
      </>)
}

export default App;
