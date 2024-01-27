import React from 'react'
import './CardIdea.css';
import Like from '../../images/like.svg'
import Dislike from '../../images/dislike.svg'

function CardIdea(props) {

  // const colorProgress = 
  //   props.chance > 10 && props.chance < 80
  //   ? "yellow"
  //   : props.chance < 10
  //   ? "red"
  //   : "green";
    
  return (
    <div className="card-idea">
      <p className="card-idea__title">{props.title}</p>
      <div className="card-idea__container">
        {/* <p className="card-idea__chance">вероятность успеха: <span className="card-idea__percent" style={{background: colorProgress}}>{props.chance}%</span></p> */}
        <p className="card-idea__chance">вероятность успеха: <span className="card-idea__percent">{props.chance}%</span></p>
        <div className="card-idea__rating-container">
          <p className="card-idea__rating">{props.likes}<img src={Like} alt='лайк' className="card-idea__like"/></p>
          <p className="card-idea__rating">{props.dislikes}<img src={Dislike} alt='дизлайк' className="card-idea__dislike"/></p>
        </div>
      </div>
    </div>
  )
}

export default CardIdea
