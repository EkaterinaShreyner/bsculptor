import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FormIdea.css';
import { Button, Form } from "react-bulma-components";
import icon from "../../images/icon-question.svg";
import Tooltip from '../Tooltip/Tooltip';

function FormIdea(props) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showToolTip, setShowToolTip] = useState(false);

  const invalidEmailOnPromoPage = (currentPath !== '/' && !isValidEmail);

  const onMouseEnterHandler = () => {
    setShowToolTip(true);
  };
  const onMouseLeaveHandler = () => {
    setShowToolTip(false);
  };

  function onCheckIdea(e) {
    e.preventDefault();
    // props.onCheckIdea();
    props.modal(true);
  }

  function onChangeInput(e) {
    props.onChangeInput(e)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(props.value));
  }

  // const tooltip = showToolTip && 
  //   <div
  //   className="main__question"
  //   onMouseEnter={onMouseEnterHandler}
  //   onMouseLeave={onMouseLeaveHandler}
  // >
  //   Что это?
  //   <img
  //     className="main__icon"
  //     src={icon}
  //     alt="подсказка"/>
  // </div>
  
  return (
    <form>
      <Form.Field kind="addons" align="end" className="main__form">
        <Form.Input
          onChange={onChangeInput}
          value={props.value}
          className="main__input"
          style={invalidEmailOnPromoPage ? { borderBottomColor: 'red' } : {}}
          size={9}
          minLength={2}
          placeholder={props.placeholder}
        />
        {invalidEmailOnPromoPage && 
        <Form.Help color="danger" className="is-hidden-tablet">Невалидная почта</Form.Help>}
        <Button
          className="main__button-submit"
          type="submit"
          disabled={props.value === "" || invalidEmailOnPromoPage ? true : false}
          onClick={onCheckIdea}
        >
          {currentPath === '/'? "Оценить" : "Прислать"}
          {currentPath === "/" &&
            <div
              className="main__question"
              onMouseEnter={onMouseEnterHandler}
              onMouseLeave={onMouseLeaveHandler}
            >
              &nbsp;&nbsp;Что это?
              <img
                className="main__icon"
                src={icon}
                alt="подсказка"/>
              {showToolTip && <Tooltip></Tooltip>}
            </div>
            
          }
          
        </Button>
      </Form.Field>
      {invalidEmailOnPromoPage && 
        <Form.Help color="danger" className="is-hidden-mobile">Невалидная почта</Form.Help>}
    </form>
  )
}

export default FormIdea;
