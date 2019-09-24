'use strict';

// module.exports = function(Email) {

// };
module.exports = function(Email) {
    // send an email
    Email.sendEmail = function(cb) {
      Email.app.models.Email.send({
        to: 'anithasuresh035@gmail.com',
        from: 'minnuanitha20@gmail.com',
        subject: 'my subject',
        text: 'my text',
        html: 'my <em>html</em>'
      }, function(err, mail) {
        console.log('email sent!');
        cb(err);
      });
    }
  };
 

  