import { List, Map } from 'immutable';
import { expect } from 'chai';
import { setEntries, next, vote } from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('add the entries into the state', () => {
      const state = Map();
      const entries = List.of('A', 'B');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('A', 'B')
      }));
    })

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['A', 'B'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('A', 'B')
      }));
    });

  });


  describe('next', () => {

    it("takes the next two entries under vote", () => {
      const state = Map({
        entries: List.of('A', 'B', 'C')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        entries: List.of('C'),
        vote: Map({
          pair: List.of('A', 'B')
        })
      }))
    });

    it("puts winner of current vote back to entries", () => {
      const state = Map({
        entries: List.of('C', 'D', 'E'),
        vote: Map({
          pair: List.of('A', 'B'),
          tally: Map({ 'A': 2, 'B': 1 })
        })
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        entries: List.of('E', 'A'),
        vote: Map({
          pair: List.of('C', 'D')
        })
      }))
    });

    it("puts both from tied vote back to entries", () => {
      const state = Map({
        entries: List.of('C'),
        vote: Map({
          pair: List.of('A', 'B'),
          tally: Map({ 'A': 2, 'B': 2 })
        })
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        entries: List.of('B'),
        vote: Map({
          pair: List.of('C', 'A')
        })
      }))
    });

    it("marks winner when just one entry left", () => {
      const state = Map({
        entries: List(),
        vote: Map({
          pair: List.of('A', 'B'),
          tally: Map({ 'A': 2, 'B': 1 })
        })
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: 'A'
      }))
    });


  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('A', 'B')
      });
      const nextState = vote(state, 'A');

      expect(nextState).to.equal(Map({
        pair: List.of('A', 'B'),
        tally: Map({ 'A': 1 })
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        pair: List.of('A', 'B'),
        tally: Map({ 'A': 1, 'B': 2 })
      });
      const nextState = vote(state, 'A');

      expect(nextState).to.equal(Map({
        pair: List.of('A', 'B'),
        tally: Map({ 'A': 2, 'B': 2 })
      }));
    });

  });

});