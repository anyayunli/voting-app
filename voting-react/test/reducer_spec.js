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

});