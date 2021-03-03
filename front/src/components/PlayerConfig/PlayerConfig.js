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

        // this.state = this.props.user

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDeck = this.handleChangeDeck.bind(this);
    }

    handleChangeName(event) {
      this.props.onUserChange({name: event.target.value, deck: this.props.user.deck}, this.props.number)
    }

    handleChangeDeck(event) {
      this.props.onUserChange({name: this.props.user.name, deck: event.target.value}, this.props.number)
    }

    render(){
      const user = this.props.user;
      return (
        <div className={styles.PlayerConfig}>
          <div className="field">
            Name: <input type="text" value={user.name} onChange={this.handleChangeName}></input>
          </div>
          <div className="field">
            Deck url: <input type="text" value={user.deck} onChange={this.handleChangeDeck}></input>
          </div>

        </div>
      )
    }
}