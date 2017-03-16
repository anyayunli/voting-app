import React from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

export const Voting = React.createClass({
  mixins: PureRenderMixin,
  render: function() {
    return <div>
      {this.props.winner?
        <Winner ref="winner" winner={this.props.winner}/>:
        <Vote {...this.props}/>}
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  };
}

/* The module now exports two components: The pure component Voting and the connected 
 * component VotingContainer. The react-redux documentation calls the former a "dumb" 
 * component and the latter a "smart" component. The connected/smart component, 
 * wraps the pure version with some logic that will keep it in sync with the changing
 *  state of the Redux Store*/
export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);