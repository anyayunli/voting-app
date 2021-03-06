import makeStore from './src/store';
import startServer from './src/server';

/**
A client sends an action to the server.
The server hands the action to the Redux Store.
The Store calls the reducer and the reducer executes the logic related to the action.
The Store updates its state based on the return value of the reducer.
The Store executes the listener function subscribed by the server.
The server emits a 'state' event.
All connected clients - including the one that initiated the original action - receive the new state. 
*/

export const store = makeStore();
startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({ type: 'NEXT' });