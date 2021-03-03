import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Decklist.css';

import Card from '../Card/Card'

const Decklist = (props) => {
  const cards = [];
  const data = props.deck;
  const [isShown, setIsShown] = useState(false)
  const [detail, setDetail] = useState("")

  function detailCb(card) {
    setIsShown(true)
    setDetail(card)
  }

  for (const i in data) {
    if (Object.hasOwnProperty.call(data, i)) {
      const card = data[i]
      cards.push(<Card infos={card} key={card.ID} cb={detailCb} hide={setIsShown}></Card>);
    }
  }

  return (
    <div className="Decklist">
      {isShown && (
        <div className="detail" dangerouslySetInnerHTML={{__html: detail.Translation}}>
          {/* <React.Fragment>
          {detail.Translation}
          </React.Fragment> */}
        </div>
      )}
      {cards}
    </div>
  )
};

Decklist.propTypes = {};

Decklist.defaultProps = {};

export default Decklist;
