import React from "react";
import { useState } from "react";

import './CardPromo.css'

function CardPromo({id, textStart, textBold, textFor, textEnd, crossedPrices, actualPrices, ImageCards}) {
  const [checkmark, setCheckMark] = useState(false);
  const [choosedPromoId, setChoosePromoId] = useState(-1);
  const handleClickPromo = () => { 
    setCheckMark(!checkmark); 
    setChoosePromoId(id)} 



  return (
    <div className="card-promo-container" onClick={handleClickPromo} id={id}>
      <div className="card-promo">
        <div className="card-promo__title">
          <p className="card-promo__title-normal">
            {textStart}
          </p>
          <span className="card-promo__title-bold">{textBold}</span>
          <p className="card-promo__title-normal">{textFor}</p>
          <p className="card-promo__title-normal">{textEnd}</p>
        </div>
          <div className="card-promo__price">
            <s className="card-promo__price-previous">
              {crossedPrices}
            </s>
            <span className="card-promo__price-actual">
              {actualPrices}&#8381;
            </span>
          </div>
        <img className="card-promo__image" src={ImageCards} alt="картинка"/>
      </div>
      <div className={`card-promo__option ${checkmark? "card-promo__option_active" : ""}`}></div>
      {/* <div className="card-promo__option card-promo__option_active"></div> */}
    </div>
  );
}

export default CardPromo;