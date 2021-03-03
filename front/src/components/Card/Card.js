import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = (props) => {
  const card = props.infos;

  return (
    <div className="Card">
      <img src={card.URL} onMouseEnter={() => props.cb(card)} onMouseLeave={() => props.hide(false)}></img>
    </div>
  )
};

Card.propTypes = {

};

Card.defaultProps = {};

export default Card;
