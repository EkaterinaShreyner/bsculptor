import React from 'react';
import './Tooltip.css';

function Tooltip() {
  return (
    <div className="tooltip">
      <p className="tooltip__text">Я искусственный интеллект <span className="tooltip__span">BusinesSculptor</span>, который поможет тебе тестировать свои бизнес идеи, оценить чужие и наконец-то стать предпринимателем.</p>
    </div>
  )
}

export default Tooltip
