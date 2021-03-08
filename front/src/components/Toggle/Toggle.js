import React from 'react';
import PropTypes from 'prop-types';
import './Toggle.css';

const Toggle = (props) => (
  <div className="Toggle">
    <button onClick={props.toggleFunc}>
      {props.toHide && ">"}
      {!props.toHide && "<"}
    </button>
  </div>
);

Toggle.propTypes = {};

Toggle.defaultProps = {};

export default Toggle;
