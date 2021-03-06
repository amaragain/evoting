'use strict';
const Web3 = require('web3');

// console.log('Web3', Web3);
const options = {
    defaultAccount: '0x0',
    defaultBlock: 'latest',
    defaultGas: 1,
    defaultGasPrice: 0,
    transactionBlockTimeout: 50,
    transactionConfirmationBlocks: 24,
    transactionPollingTimeout: 480
}
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'), options);


module.exports = function (Elections) {



    Elections.createEthElecAccount = ((elec_details, cb) => {
        console.log('user', elec_details);

        // var createdAccount = web3.eth.personal.newAccount(Elections.id)
        //     .then(console.log);
        var createdAccount = web3.eth.accounts.create(elec_details.id);

        // var insertObj = {
        //     walletAddress: createdAccount.address,
        //     privateKey: createdAccount.privateKey
        // };

        // var hashedData = web3.eth.accounts.hashMessage(user_detail.id);
        // var createdAccount = web3.eth.accounts.create(user_detail.id);
        // insertObj.walletAddress = createdAccount.address;
        // insertObj.privateKey = createdAccount.privateKey;
        // insertObj.id = elec_details.id;

        console.log('createdAccount', createdAccount);
        // console.log('insertObj', insertObj);

        Elections.upsert(
            {
                'id': elec_details.id,
                'walletAddress': createdAccount.address,
                'privateKey': createdAccount.privateKey
            },
            function (err, result) {
                console.log('result', result);
                cb(null, result);

            });


        // web3.eth.getBalance(createdAccount.address, (err, wei) => {
        //     balance = web3.utils.fromWei(wei, 'ether');
        //     console.log('balance', balance);
        // });

    });


    Elections.remoteMethod(
        'createEthElecAccount', {
            description: "Create an account",
            accepts: [
                { arg: 'elec_details', type: 'object' }
            ],
            returns: { arg: 'success', type: 'object' }
        });

};
