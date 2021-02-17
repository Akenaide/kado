import React from 'react';
import ReactDOM from 'react-dom';
import PlayerConfig from './PlayerConfig';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayerConfig />, div);
  ReactDOM.unmountComponentAtNode(div);
});