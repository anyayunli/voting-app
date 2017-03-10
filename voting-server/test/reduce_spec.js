import { expect } from 'chai';
import { Map, fromJS } from 'immutable';
import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles default', () => {
    const action = {
      type: 'SET_ENTRIES',
      entries: ['A']
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['A']
    }))
  });

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES',
      entries: ['A']
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['A']
    }))
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['A', 'B']
    });
    const action = { type: 'NEXT' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: [],
      vote: {
        pair: ['A', 'B']
      }
    }));

  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      entries: [],
      vote: {
        pair: ['A', 'B']
      }
    });
    const action = {
      type: 'VOTE',
      entry: 'A'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: [],
      vote: {
        pair: ['A', 'B'],
        tally: { 'A': 1 }
      }
    }));
  });

  it('reducer states machine ', () => {
    const initialState = Map();
    const actions = [
      { type: 'SET_ENTRIES', entries: ['A', 'B'] },
      { type: 'NEXT', },
      { type: 'VOTE', entry: 'A' },
      { type: 'VOTE', entry: 'A' },
      { type: 'NEXT' }
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'A'
    }))
  });

});