import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as mainApi from "../../utils/MainApi";

import "./DataAdmin.css"

function DataAdmin() {
  const [cardPromo, setCardPromo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    mainApi.getPromoCodes()
      .then((cards) => {
        setCardPromo(cards)
        console.log(cardPromo)
      })
      .catch((err) => console.log(err))
}, [])


const renderCards = cardPromo.map((data) => (
  <div className="admin__container">
    <span className="admin__promo-title">{data.title}</span>
    <span className="admin__count">{data.countChoosed}</span>
  </div>
));
  return (
    <section className="admin">
      <h1 className="admin__title">Количество выбранных промокодов</h1>
      {renderCards}
      <button
        className="admin__button"
        onClick={() => navigate('/', { replace: true })}
      >На главную
      </button>
    </section>
    
  )
}

export default DataAdmin;
