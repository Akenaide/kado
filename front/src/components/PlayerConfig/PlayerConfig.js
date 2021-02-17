import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlayerConfig.module.css';
import Overlay from '../Overlay/Overlay';

// const PlayerConfig = () => (
//   <div className={styles.PlayerConfig}>
//     PlayerConfig Component
//   </div>
// );

// PlayerConfig.propTypes = {};

// PlayerConfig.defaultProps = {};


export default class PlayerConfig extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
      return (
        <div className={styles.PlayerConfig}>
          <div className="field">
            Name: <input type="text" value={this.user.name}></input>
          </div>
          <div className="field">
            Deck url: <input type="text" value={this.user.deck}></input>
          </div>
        </div>
      )
    }
}