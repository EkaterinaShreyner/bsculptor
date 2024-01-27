import React, { useState, useEffect } from 'react';
import './CardIdeaList.css';
import CardIdea from '../CardIdea/CardIdea';
import { Button } from "react-bulma-components";
// import { cardIdeaData } from '../../utils/constants';
import circul from '../../images/circul.svg';
import * as mainApi from "../../utils/MainApi";

function CardIdeaList(props) {
  const [shownNewIdea, setShowNewIdea] = useState(false);
  const [showCards, setShowCards] = useState(4);
  const [cardIdeaList, setCardIdeaList] = useState([]);

  useEffect(() => {
    mainApi.getCards()
      .then((cards) => {
        setCardIdeaList(cards)
      })
      .catch((err) => console.log(err))

}, [])

  const bestIdeas = 
    cardIdeaList.slice(0, showCards).map((data, index) => (
    // cardIdeaData.slice(0, showCards).map((data, index) => (
      <CardIdea
        key={index}
        title={data.title}
        likes={data.likes}
        dislikes={data.dislikes}
        chance={data.chance}
      />
    ))
  const newIdeas = 
    cardIdeaList.slice(0, showCards).map((data, index) => (
    // cardIdeaData.slice(0, showCards).map((data, index) => (
      <CardIdea
        key={index}
        title={data.title}
        likes={data.likes}
        dislikes={data.dislikes}
        chance={data.chance}
      />
    ))

  const renderButtonShowMore = 
    <Button
      className="card-idea__list-button"
      onClick={() => setShowCards(prevValue => prevValue + 2)}
      > 
      Смотреть еще
      <img src={circul} className="card-idea__list-img" alt="смотреть еще" />
    </Button>
  return (
    <>
      <div className="card-idea__list-container">
        <div className="card-idea__nav">
          <p className="card-idea__type" style={shownNewIdea ? {color: 'rgba(47, 47, 55, 0.35)'} : {}} onClick={() => {setShowNewIdea(false); setShowCards(4)}}>Лучшие идеи</p>
          <p className="card-idea__type" style={!shownNewIdea ? {color: 'rgba(47, 47, 55, 0.35)'} : {}} onClick={() => {setShowNewIdea(true); setShowCards(4)}}>Новые идеи</p>
        </div>
        <div className="card-idea__list">
          {shownNewIdea ? newIdeas : bestIdeas}
        </div>
      </div>
        {showCards < cardIdeaList.length && renderButtonShowMore}
    </>
  )
}

export default CardIdeaList;