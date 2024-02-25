import React from "react";
import { useEffect, useState, useContext } from "react";
import CardPromo from "../CardPromo/CardPromo";
import { promoData } from "../../utils/constants"; 
import lightning from "../../images/lightning.svg";
import vector from "../../images/Vector724.svg";

import './Promo.css'
import FormIdea from "../FormIdea/FormIdea";
import { Link } from "react-router-dom";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import * as mainApi from "../../utils/MainApi";
import { IdeaTextContext } from "../../context/IdeaTextContext.js";

function Promo() {
  const [emailValue, setEmailValue] = useState("");
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [choosedIdPromoCard, setChoosedIdPromoCard] = useState(-1);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [title, setTitle] = useState('')
  const ideaValue = useContext(IdeaTextContext);

  useEffect(() => {
    setTitle(ideaValue);
  }, [ideaValue]);

  const handleValueChange = (idPromoCard) => {
    setChoosedIdPromoCard(idPromoCard);
  };

  function handleInputChange (e) {
    const inputValue = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValue(e.target.value)
    setIsValidEmail(emailRegex.test(inputValue));
  };
  
  const emailPlaceholder = "Напиши свою почту, а мы пришлем результаты обработки твоей идеи нашим ИИ:";
  const isHiddenMobile = () => {
    return window.innerWidth <= 1439;
  }

  const handleShowModal = () => {
    mainApi.createUserPromo({
      userEmail: emailValue,
      cardPromoId: choosedIdPromoCard,
      title: ideaValue
    })
      .then(() => {
        setShowModalConfirm(true)
        setTimeout(() => {
          setShowModalConfirm(false)
        }, 2000);
      })
      .catch((err) => console.log('Ошибка при отправке запроса:', err))
      .finally(() => {
        setEmailValue("")
        setShowModalConfirm(false)
      })
  };

  const renderedCards = promoData.map((data, index) => (
    <CardPromo
      key={index}
      id={data.id}
      textStart={data.textStart}
      textBold={data.textBold}
      textFor={data.textFor}
      textEnd={data.textEnd}
      crossedPrices={data.crossedPrice}
      actualPrices={data.actualPrice}
      ImageCards={isHiddenMobile() ? data.imageMobile : data.image}
      onPromoIdChange={handleValueChange}
      isChoosed={data.id === choosedIdPromoCard ? true : false}
    />
  ));
  return (
    <>
      <div className="promo">
        <p className="promo__title">
          Чтобы идея стала реальностью, воспользуйся нашими сервисами с ИИ
          <img className="promo__image-lightning" src={lightning} alt="молния" />
        </p>
        <p className="promo__subtitle">И выбери один, который хочешь больше всего</p>
        <button onClick={() => window.scrollTo(0, 2000)} className="promo__button-scroll">
          Скролль ниже
          <img className="promo__image-vector" src={vector} alt="стреочка внизу" />
        </button>
        <div className="promo__cards-list">
          {renderedCards}
        </div>
        <span className="promo__label">
          {emailPlaceholder}
        </span>
        <FormIdea
          modal={handleShowModal}
          placeholder="Email@gmail.com"
          value={emailValue}
          onChangeInput={handleInputChange}
          choosedIdPromoCard={choosedIdPromoCard}
          isValid={isValidEmail}
        ></FormIdea>
        <Link to="/" className="ideas__nav-back">Вернуться к началу</Link>
      </div>
      {showModalConfirm && <ModalConfirm modal={showModalConfirm} closeModal={() => setShowModalConfirm(false)}/>}
    </>
  );
}

export default Promo;