import { Map, List } from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  } else {
    return state;
  }
}

function resetVote(state) {
  const currentPair = state.getIn(['vote', 'pair'], List());
  const hasVoted = state.get('hasVoted');
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.delete('hasVoted');
  } else {
    return state;
  }
}

export default function reducer(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}