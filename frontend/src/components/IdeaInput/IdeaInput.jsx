import React from "react";
import { useState } from "react";
import { Modal } from "react-bulma-components";
import './IdeaInput.css'
import RenderProgress from "../Progress/Progress"
import FormIdea from "../FormIdea/FormIdea";
import * as mainApi from "../../utils/MainApi";


function IdeaInput(props) {
  const [ideaValue, setIdeaValue] = useState("");
  const [isShowModal, setShowModal] = useState(false)
  const [chance, setChance] = useState(0);
  const [isValidInputIdea, setIsValidInputIdea] = useState(true);
  const [responseInvalid, setResponseInvalid] = useState(false);

  function handleCheckIdea() {
    const randomNumber = Math.floor(Math.random() * 90) + 5;
    setChance(randomNumber)
    mainApi.createNewCard({
      title: ideaValue,
      chance: randomNumber
    })
    .then(res => res.text())
    .then((text) => {
      console.log(text)
      if (text.trim() === 'нет') {
        console.log("1")
        setResponseInvalid(true);
        setShowModal(false); // Если ответ "Нет", скрываем модальное окно
        
      } else {
        console.log("3")
        setShowModal(true);
        props.text(ideaValue);
      }
    })
    .catch(err => {
      console.error('Произошла ошибка при создании новой карточки:', err);
      // Обработка ошибок, если необходимо
    });
  }

  function handleInputChange (e) {
    const inputValue = e.target.value;
    const regex = /^[А-Яа-я0-9.,:%!:=?-@*()+_<>; ]{5,}$/;
    setIdeaValue(e.target.value)
    setIsValidInputIdea(regex.test(inputValue));
    setResponseInvalid(false)
  };

  function RenderModalProgress() {
    return (
      <Modal 
        show={isShowModal}
        onClose={() => setShowModal(false)} 
        closeOnEsc="true"
        closeOnBlur="true"
        className="modal__background">
        <Modal.Card className="modal__container" closeOnBlur="false">
          <Modal.Card.Body className="modal__content">
            {RenderProgress(ideaValue, chance)}
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    );
  }
  return (
    <div>
      <RenderModalProgress/>
      <FormIdea
        modal={handleCheckIdea}
        placeholder="Опиши свою идею"
        value={ideaValue}
        onChangeInput={handleInputChange}
        isValid={responseInvalid ? false : isValidInputIdea}
        responseInvalid={responseInvalid}
      ></FormIdea>
    </div>
  );
}

export default IdeaInput;