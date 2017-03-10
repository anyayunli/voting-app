import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

/* set entries of the state */
export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinner(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const avotes = vote.getIn(['tally', a], 0);
  const bvotes = vote.getIn(['tally', b], 0);
  if (avotes > bvotes) return [a];
  else if (avotes < bvotes) return [b];
  else return [a, b];
}

/* create/update a vote Map on the state, where the two first entries are included under the
key pair. The entries under vote should no longer be in the entries List, if there is only one
entry in the state, set the winner as this entry. */
export function next(state) {
  const entries = state.get('entries').concat(getWinner(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote').remove('entries').set('winner', entries.first());
  } else {
    return state.merge(Map({
      vote: Map({
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    }))
  }
}

/* updating the active voting entries in the state, initialized with a tally of 0,
increment the tally if an entry is voted */
export function vote(state, entry) {
  return state.updateIn(['vote', 'tally', entry], 0, val => val + 1);
}