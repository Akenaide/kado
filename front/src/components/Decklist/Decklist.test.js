import React from 'react';
import ReactDOM from 'react-dom';
import Decklist from './Decklist';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Decklist />, div);
  ReactDOM.unmountComponentAtNode(div);
});