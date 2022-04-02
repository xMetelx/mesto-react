import React from "react"

const Card = (props) => {

  function handleClick ()  {
    props.click(props.card);
  }

  return (
    <li className="element">
      <div style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick} className="element__image" />
      <button type="button" className="element__basket"></button>
      <div className="element__subscription">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-position">
          <button type="button" className="element__button"></button>
          <div className="element__like-counter">{props.card.name.length}</div>
        </div>
      </div>  
    </li>
  )
}

export default Card; 