import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import { List, Map } from 'immutable';
import { expect } from 'chai';
import Results from '../../src/components/Results';

describe('results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('A', 'B');
    const tally = Map({ 'A': 2 });
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [first, second] = entries.map(k => k.textContent);

    expect(entries.length).to.equal(2);
    expect(first).to.contain('A');
    expect(first).to.contain('2');
    expect(second).to.contain('B');
    expect(second).to.contain('0');
  })

  it('invokes the next callback when next is clicked', () => {
    let nextInvoked = false;
    let next = () => nextInvoked = true;
    const pair = List.of('A', 'B');
    const component = renderIntoDocument(
      <Results pair= {pair} next={next} tally={Map()}/>
    );

    Simulate.click(ReactDOM.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  })

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results pair={['A', 'B']} winner="A" tally={Map()} />
    );

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('A');
  })
})