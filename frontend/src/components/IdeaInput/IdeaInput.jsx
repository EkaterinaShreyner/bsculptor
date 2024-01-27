import React from "react";
import { useState,  } from "react";
import { Modal } from "react-bulma-components";
import './IdeaInput.css'
import RenderProgress from "../Progress/Progress"
import FormIdea from "../FormIdea/FormIdea";
import * as mainApi from "../../utils/MainApi";


function IdeaInput() {
  const [value, setValue] = useState("");
  const [isShowModal, setShowModal] = useState(false)
  const [chance, setChance] = useState(0);

  function handleCheckIdea() {
    const randomNumber = Math.floor(Math.random() * 90) + 5;
    setChance(randomNumber)
    mainApi.createNewCard({
      title: value,
      chance: randomNumber
    })
    setShowModal(true);
  }

  function RenderModalProgress() {
    return (
      <Modal 
        show={isShowModal}
        onClose={() => setShowModal(false)} 
        closeOnEsc="true"
        closeOnBlur="true"
        className="modal__background">
        <Modal.Card className="modal__container" closeOnBlur="false">
          {/* <Modal.Card.Header>
            <Modal.Card.Title textColor="success">l
            </Modal.Card.Title>
          </Modal.Card.Header> */}
          <Modal.Card.Body className="modal__content">
            {RenderProgress(value, chance)}
          </Modal.Card.Body>
          {/* <Modal.Card.Footer 
            className="buttons"
            style={{justifyContent: "end"}}
          >
          </Modal.Card.Footer> */}
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
        value={value}
        // onCheckIdea={handleCheckIdea}
        onChangeInput={(e) => setValue(e.target.value)}
      ></FormIdea>
    </div>
  );
}

export default IdeaInput;