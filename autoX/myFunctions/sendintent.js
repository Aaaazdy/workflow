
//used to send intent to the tasker to notify users!!!!
//It's marvelous!!!
function sendintent(actions, detail) {
  // send-broadcast.js

  app.sendBroadcast({
    action: actions,
    extras: {
      from: 'Autojs',
      version: '3.1.0 Beta',
      info: detail,
    },
  });
}