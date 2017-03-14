import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach('8090');

  /* subscribe to a Redux store by providing a function that the store will call 
  after every action it applies, when the state has potentially changed */
  store.subscribe(() => io.emit('state', store.getState().toJS()));

  /* for clients to immediately receive the current state when they connect to the application.
  we should also be able to receive updates from them*/
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS()),
    socket.on('action', store.dispatch.bind(store))
  });
}