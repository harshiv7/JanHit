const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')();

admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.https.onRequest((request, response) => {

  cors(request, response, () => {
    var data = request.body;

    var message = {
      notification: {
        title: data.title,
        body: data.body
      }
    };

    admin.messaging().sendToTopic(data.topic, message)
      .then(function(res) {
        admin.database().ref('Development').child('notifications').child(data.topic).push(message.notification);
        return response.send(res)
      })
      .catch(function(error) {
        return response.send(err)
      });
  })

});
