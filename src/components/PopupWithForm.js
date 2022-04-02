import React from "react"

function PopupWithForm (props) {
  return (
    <div className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        
        <form noValidate name={props.name} className="popup__inputs">
          <h2 className="popup__title">{props.title}</h2>
          
          {props.children}

          <button type="submit" disabled className="popup__button popup__button_disabled">Создать</button>
        </form>
      </div>
    </div> 
  )
}

export default PopupWithForm;