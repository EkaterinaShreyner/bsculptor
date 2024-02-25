import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FormIdea.css';
import { Button, Form } from "react-bulma-components";
import icon from "../../images/icon-question.svg";
import Tooltip from '../Tooltip/Tooltip';


function FormIdea(props) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showToolTip, setShowToolTip] = useState(false);

  useEffect(() => {
  }, [props.responseInvalid, props.isValid])

  const onMouseEnterHandler = () => {
    setShowToolTip(true);
  };
  const onMouseLeaveHandler = () => {
    setShowToolTip(false);
  };

  function onCheckIdea(e) {
    e.preventDefault();
    props.modal(true);
  }

  function onChangeInput(e) {
    props.onChangeInput(e)
  }

  const errorTablet = props.responseInvalid
  ? <Form.Help color="danger" className="is-hidden-tablet">Невалидная идея</Form.Help> 
  : !props.isValid 
  ? <Form.Help color="danger" className="is-hidden-tablet">Текст должен содержать кириллицу и быть не менее 5 символов</Form.Help>
  : null

  const errorMobile = props.responseInvalid
  ? <Form.Help color="danger" className="is-hidden-mobile">Невалидная идея</Form.Help> 
  : !props.isValid 
  ? <Form.Help color="danger" className="is-hidden-mobile">Текст должен содержать кириллицу и быть не менее 5 символов</Form.Help>
  : null

  return (
    <form>
      <Form.Field kind="addons" align="end" className="main__form">
        <Form.Input
          onChange={onChangeInput}
          value={props.value}
          className="main__input"
          style={!props.isValid ? { borderBottomColor: 'red' } : {}}
          size={9}
          minLength={2}
          placeholder={props.placeholder}
        />
        {currentPath === "/promo" ?
          !props.isValid && <Form.Help color="danger" className="is-hidden-tablet">Невалидная почта</Form.Help>
          :
          // !props.isValid && <Form.Help color="danger" className="is-hidden-tablet">Текст должен содержать кириллицу и быть не менее 5 символов</Form.Help>
          errorTablet
        }
        <Button
          className="main__button-submit"
          type="submit"
          disabled={!props.isValid || props.value === "" || props.choosedIdPromoCard === -1}
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
        {currentPath === "/promo" ?
          !props.isValid && <Form.Help color="danger" className="is-hidden-mobile">Невалидная почта</Form.Help>
          :
          errorMobile      
        }
    </form>
  )
}

export default FormIdea;
