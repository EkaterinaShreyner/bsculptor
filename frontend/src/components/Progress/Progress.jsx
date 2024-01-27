import React from "react";
import { useState, useEffect } from "react";
import './Progress.css'
import { Columns, Card, Button } from "react-bulma-components";
import ProgressBar from "../ProgressBar/ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import iconFb from '../../images/brand-icon_facebook.svg'
import iconVk from '../../images/brand-icon_vk.svg'
import iconTg from '../../images/brand-icon_telegram.svg'
import iconTw from '../../images/brand-icon_twitter.svg'

const SocialLink = ({ icon, label, onMouseEnter, onMouseLeave, showName }) => (
  <li className="chech__link-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={() => {}}>
    <button className="chech__link">
      <img className="check__link-icon" src={icon} alt={`icon ${label}`} />
      {showName && <span style={{ color: 'white' }}>{label}</span>}
    </button>

  </li>
)
function RenderProgress(value, chance) {
  const navigate = useNavigate();
  const [showNames, setShowNames] = useState({
    fb: false,
    vk: false,
    tg: false,
    tw: false,
  });

  // useEffect(() => {
  //   setTimeout(window.scrollTo(0, 2000))}, [chance]);

  const handleMouseEnter = (socialMedia) => {
    setShowNames((prevShowNames) => ({ ...prevShowNames, [socialMedia]: true }));
  };

  const handleMouseLeave = (socialMedia) => {
    setShowNames((prevShowNames) => ({ ...prevShowNames, [socialMedia]: false }));
  };

  return (
      <div className="check">
        <p className="check__idea">{value}</p>
        <Columns className="check__container">
          <Columns.Column>
              <p className="check__title">
                ВЕРОЯТНОСТЬ УСПЕХА
              </p>
            {ProgressBar(chance)}
            <p className="check__result">Опубликовать результат</p>
            <ul className="check__links">
              <SocialLink
                icon={iconFb}
                label="Facebook"
                onMouseEnter={() => handleMouseEnter('fb')}
                onMouseLeave={() => handleMouseLeave('fb')}
                showName={showNames.fb}
              />
              <SocialLink
                icon={iconVk}
                label="Vkontakte"
                onMouseEnter={() => handleMouseEnter('vk')}
                onMouseLeave={() => handleMouseLeave('vk')}
                showName={showNames.vk}
              />
              <SocialLink
                icon={iconTg}
                label="Telegram"
                onMouseEnter={() => handleMouseEnter('tg')}
                onMouseLeave={() => handleMouseLeave('tg')}
                showName={showNames.tg}
              />
              <SocialLink
                icon={iconTw}
                label="Twitter"
                onMouseEnter={() => handleMouseEnter('tw')}
                onMouseLeave={() => handleMouseLeave('tw')}
                showName={showNames.tw}
              />
            </ul>
          </Columns.Column>
          <Columns.Column>
            <Card className="card noLeftBottomRadius">
              <div className="check__image"></div>
              {/* <p className="check__description">
                Но вообще-то вряд ли получится потому что…
              </p> */}
              <p className="check__know">
                Узнать наиболее вероятные проблемы, которые у тебя возникнут по мнению нашего ИИ
              </p>
              <Button
                className="check__button-know"
                onClick={() => navigate('/promo', { replace: true })}>
                  Узнать
              </Button>
            </Card>
          </Columns.Column>
        </Columns>
      </div>
  );
}

export default RenderProgress;