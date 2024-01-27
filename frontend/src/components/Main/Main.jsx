import React from 'react'
import './Main.css'
import '../Ideas/Ideas.css';
import line1 from '../../images/line1.svg';
import line2 from '../../images/line2.svg';
import lamp from '../../images/lamp.svg';
import lampMobile from '../../images/lampMobile.svg';

import IdeaInput from '../IdeaInput/IdeaInput';
import CardIdeaList from '../CardIdeaList/CardIdeaList';

function Main(props) {

  const isHiddenMobile = () => {
    return window.innerWidth <= 1000;
  }

  return (
    <>
      <main className="main">
        {/* <h1 className="main__title">Расскажи о своей идее для бизнеса, а наш <span className="main__title-span">искусственный интеллект </span>оценит вероятность твоего успеха.</h1> */}
        <h1 className="main__title">Опиши свою бизнес идею, а искусственный интеллект ее оценит
          <img className="main__line-first" src={line1} alt ="линия один" />
          <img className="main__line-second" src={line2} alt ="линия два" />
          <img className="main__img-lamp" src={!isHiddenMobile()? lamp : lampMobile} alt="идея" />
        </h1>
        <IdeaInput />
        <CardIdeaList />
      </main>
      
    </>
  )
}

export default Main;
