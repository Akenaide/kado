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

        // this.state = this.props.player

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDeck = this.handleChangeDeck.bind(this);
    }

    handleChangeName(event) {
      this.props.onplayerChange({name: event.target.value, deck: this.props.player.deck}, this.props.number)
    }

    handleChangeDeck(event) {
      this.props.onplayerChange({name: this.props.player.name, deck: event.target.value}, this.props.number)
    }

    render(){
      const player = this.props.player;
      return (
        <div className={styles.PlayerConfig}>
          <div className="field">
            Name: <input type="text" value={player.name} onChange={this.handleChangeName}></input>
          </div>
          <div className="field">
            Deck url: <input type="text" value={player.deck} onChange={this.handleChangeDeck}></input>
          </div>

        </div>
      )
    }
}