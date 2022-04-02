import React from "react";

const ImagePopup = ({card, onClose}) => {

  return (
    <div className={card ? `popup popup_open-photo popup_opened` : `popup popup_open-photo`}>
      <div className="popup__box-for-picture">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img src={card.link} className="popup__picture" alt="Фото" /> 
        <p className="popup__description" >{card.name}</p>
      </div>
    </div>  
  )
}

export default ImagePopup;