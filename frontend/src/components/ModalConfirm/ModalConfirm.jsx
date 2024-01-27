import React from 'react';
import './ModalConfirm.css';
import SmileConfirm from "../../images/smileconfirm.png";
// import Cross from '../../images/FrameX.svg';

function ModalConfirm(props) {
  return (
    <div className="modal-confirm">
      <div className="modal-confirm__container">
        <button
          onClick={props.closeModal}
          className="modal-confirm__close"
          ></button>
        {/* <div className="modal-confirm__img"></div> */}
        <img className="modal-confirm__img" src={SmileConfirm} alt="картинка"/>
        <p className="modal-confirm__text">Результаты отправлены на почту!</p>
      </div>   
    {/* <div className={`modal-confirm ${props.modal? "modal-confirm_active" : ""} `}> */}
    </div>
    
  )
}

export default ModalConfirm
