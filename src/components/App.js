import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext'


function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen]  = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});

  useEffect (() => {
    api.getUserInfo ()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(err => console.log(err))
    api.getCards ()
      .then((data) => {

        setCards(data)
      })
      .catch(err => console.log(err))
  }, [])

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setSelectedCard({});
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

  function handleCardDeleteClick (card) {
    setConfirmDeletePopupOpen(true);
    setCardToDelete(card)
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    console.log(card);

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(card => card._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err))
  }

  function handleCardDelete () {
    api.removeCard(cardToDelete._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== cardToDelete._id))
        closeAllPopups()
  })
      .catch(err => console.log(err))
  }

  function handleUpdateUser (data) {
    api.patchProfile(data.name, data.about)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar (data) {
    api.patchAvatar (data.avatar) 
      .then((data) => {
        console.log(data);
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit (data) {
    api.postCard(data.name, data.link)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          onEditAvatar = {handleEditAvatarClick}
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onCardClick = {handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDeleteClick}
          cards = {cards}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateUser} /> 
        <EditAvatarPopup isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onSubmit={handleUpdateAvatar} />
        <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onSubmit = {handleAddPlaceSubmit} />
        <ConfirmDeletePopup isOpen = {isConfirmDeletePopupOpen} onClose = {closeAllPopups} onSubmit = {handleCardDelete} />


        <ImagePopup 
          card = {selectedCard}
          onClose = {closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
