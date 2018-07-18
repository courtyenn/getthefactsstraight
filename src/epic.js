export default action$ =>
action$.ofType('END_SESSION')
  .delay(1000) // Asynchronously wait 1000ms then continue
  .mapTo({ type: PONG });