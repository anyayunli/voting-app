import { Map } from 'immutable';
import { setEntries, next, vote, INITIAL_STATE } from './core';

/* The main reducer function only hands parts of the state to lower-level reducer functions. */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote', v => vote(v, action.entry));
  }
  return state;
}