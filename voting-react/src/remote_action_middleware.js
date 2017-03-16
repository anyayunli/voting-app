/** A Redux middleware is a function that gets invoked when an action is dispatched, 
 * before the action hits the reducer and the store itself. Middleware can be used for 
 * all kinds of things, from logging and exception handling to modifying actions, caching 
 * results, or even changing how or when the action will reach the store. Here is sending 
 * client-side actions to the server. */
export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
}