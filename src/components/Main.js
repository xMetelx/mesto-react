import { useEffect, useState } from 'react';
import api from '../utils/api';
import Card from './Card';

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {

  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect (() => {

    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar)
      })
      .catch(err => console.log(err))

    api.getCards()
      .then((data) => {
        setCards(data)
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__intro">
          <button type="button" className="profile__avatar" onClick={onEditAvatar}>
          <div className="profile__photo" style={{backgroundImage: `url(${userAvatar})`}}></div>
          </button>  
          <div className="profile__text">
            <div className="profile__edit">
              <h1 className="profile__title">{userName}</h1>
              <button type="button" aria-label="Изменить профайл" onClick={onEditProfile} className="profile__pen-button">
              </button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button type="button" aria-label="Добавить карточку" onClick={onAddPlace}  className="profile__add"></button>
      </section>

      <div className="popup popup_edit">
        <div className="popup__container">
          <button type="button" className="popup__close"></button>
          <form noValidate name="edit-profile" className="popup__inputs">
            <h2 className="popup__title">Редактировать&nbsp;профиль</h2>
            <button type="submit" className="popup__button">Сохранить</button>
          </form>
        </div>
      </div>

      <div className="popup popup_add-card">
        <div className="popup__container">
          <button type="button" className="popup__close"></button>
          <form noValidate name="add-card" className="popup__inputs">
            <h2 className="popup__title">Новое место</h2>
            <button type="submit" disabled className="popup__button popup__button_disabled">Создать</button>
          </form>
       </div>
      </div> 

      <div className="popup popup_delete-card">
        <div className="popup__container">
          <button type="button" className="popup__close"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button type="button" className="popup__button">Да</button>
        </div>
      </div>

      <div className="popup popup_change-avatar">
        <div className="popup__container">
          <form name="change-avatar" className="popup__inputs">
            <button type="button" className="popup__close"></button>
            <h2 className="popup__title">Обновить аватар</h2>
            <button type="submit" disabled className="popup__button">Сохранить</button>
          </form>
        </div>
      </div>

    <section className="elements__cards">
    {cards.map((card) => (
      <Card 
        key = {card._id}
        card = {card}
        click = {onCardClick}
      /> 
    ))
    }
    </section>

    </main>
  )
}


export default Main;