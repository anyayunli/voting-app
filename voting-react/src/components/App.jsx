import React from 'react';
import List from 'immutable';

/** Render all the markup that is common across all routes. */
const pair = ['A', 'B'];
const tally = { 'A': 1, 'B': 2 };
export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, { pair: pair, tally: tally });
  }
})