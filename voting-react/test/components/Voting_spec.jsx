import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import { List } from 'immutable';
import Voting from '../../src/components/Voting';

describe('Voting', () => {

  it('renders a pair of button', () => {
    const component = renderIntoDocument(
      <Voting pair={['A', 'B']}></Voting>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('A');
    expect(buttons[1].textContent).to.equal('B');
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={['A', 'B']} hasVoted="A"/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].textContent).to.contain('A');
  });

  it('renders just the Winner if there is one', () => {
    const component = renderIntoDocument(
      <Voting pair={['A', 'B']} winner="A"/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'buttons');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('A');
  });

  it('renders as a pure component', () => {
    const pair = List.of('A', 'B');
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('A');

    pair.set(0, 'C');
    component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    )
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('A');
  })

  it('does update DOM when props changed', () => {
    const pair = List.of('A', 'B');
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('A');

    const newPair = pair.set(0, 'C');
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    )
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('C');
  })

});