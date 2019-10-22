'use strict';
var loopback = require('loopback');
const Web3 = require('web3');

module.exports = function(app) {

  // console.log('Web3', Web3);
  // const options = {
  //   defaultAccount: '0x0',
  //   defaultBlock: 'latest',
  //   defaultGas: 1,
  //   defaultGasPrice: 0,
  //   transactionBlockTimeout: 50,
  //   transactionConfirmationBlocks: 24,
  //   transactionPollingTimeout: 480
  // }
  const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));




  var createData = function(cb) {
    // // web3.eth.accounts.create('superadmin@election.com');
    // // var createdAccount = web3.eth.personal.newAccount('superadmin@election.com')
    // var createdAccount = web3.eth.accounts.create('superadmin@election.com');
    //   // console.log('createdAccount', createdAccount);


    app.models.acc_address.find({}, function (errr, accAdr) {
      console.log('accAdr', accAdr);
      let createdAccount = accAdr[0].key;
      console.log('createdAccount', createdAccount);

      app.models.acc_address.destroyAll({ 'id': accAdr[0].id }, function (err, obj) {

      });


      app.models.Members.create([{
        name: 'Super Admin',
        email: 'superadmin@election.com',
        password: 'admin',
        userType: 'superadmin',
        role: 'admin',
        is_verified: 1,
        status: 1,
        emailVerified: true,
        walletAddress: createdAccount,
      }], (err, res) => {
        console.log(res);
      });

    });


  }



  app.models.Members.findOne({
    where: {
      userType: 'superadmin'
    }
  }, (err, _item) => {


    if (!_item) {
      createData();
      // createAdminWallet();
    }

  })
}
