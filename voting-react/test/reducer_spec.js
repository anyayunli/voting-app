import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['A', 'B'],
          tally: { 'A': 1 }
        }
      }
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: { 'A': 1 }
      }
    }))
  });

  it('handles SET_STATE without initial state', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['A', 'B'],
          tally: { 'A': 1 }
        }
      }
    };

    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: { 'A': 1 }
      }
    }))
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: { 'A': 1 }
      }
    });
    const action = { type: 'VOTE', entry: 'A' };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: { 'A': 1 }
      },
      hasVoted: 'A'
    }));
  })

  it('handles VOTE by not setting hasVoted for invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: { 'A': 1 }
      }
    });
    const action = { type: 'VOTE', entry: 'C' };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: { 'A': 1 }
      }
    }));
  })

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const state = fromJS({
      vote: {
        pair: ['C', 'B'],
        tally: { 'C': 1 }
      },
      hasVoted: 'C'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['A', 'B']
        }
      }
    };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B'],
      }
    }));
  })

});