'use strict';
var loopback = require('loopback');

module.exports = function(app) {

  var createData = function(cb) {

    app.models.Members.create([{
      name: 'Super Admin',
      email: 'superadmin@election.com',
      password: 'admin',
      userType: 'superadmin',
      role: 'admin',
      is_verified: 1,
      status: 1,
      emailVerified: true,
    }], (err, res) => {

    })

  }


  app.models.Members.findOne({
    where: {
      userType: 'superadmin'
    }
  }, (err, _item) => {


    if (!_item) {
      createData()
    }

  })
}
