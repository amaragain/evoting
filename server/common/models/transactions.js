'use strict';
var app = require('../../server/server');
const Web3 = require('web3');

module.exports = function (Transactions) {

    // console.log('Web3', Web3);


    Transactions.sendCoin = (async (trans_details, cb) => {

        const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

        console.log('trans_detailstrans_details', trans_details);
        // balanceAmount = web3.eth.getBalance("0x2C5e1e0c7175d657394aCB2d9265734F6Eb6194D");
        // console.log('balanceAmount', balanceAmount);

        // using the promise

        // web3.eth.accounts.wallet.create();


        let transaction = await web3.eth.sendTransaction({
            from: trans_details.sender_wallet,// trans_details.sender_wallet,
            to: trans_details.admin_wallet,//trans_details.admin_wallet,
            value: '10'
        });

        console.log('transaction', transaction);
        // .then(function (receipt) {
        //     console.log('reciept', receipt);
        //     // balanceAmount = web3.eth.getBalance(trans_details.walletAddress);
        //     // console.log('balanceAmount', balanceAmount);

        // })
        // .catch(function (error){
        //     console.log('error', error);
        // });
    });

    Transactions.remoteMethod(
        'sendCoin', {
            description: "Send coin",
            accepts: [
                { arg: 'trans_details', type: 'object' }
            ],
            returns: { arg: 'success', type: 'string' }
        });


    Transactions.sendCoinToCandi = (async (trans_details, cb) => {

        const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

        console.log('trans_detailstrans_details', trans_details);
        // balanceAmount = web3.eth.getBalance("0x2C5e1e0c7175d657394aCB2d9265734F6Eb6194D");
        // console.log('balanceAmount', balanceAmount);

        // using the promise

        // web3.eth.accounts.wallet.create();



        app.models.Members.find({ where: { id: trans_details.voter_id } }, (err1, findVoter) => {
            console.log('findVoter', findVoter);
            app.models.Members.find({ where: { id: trans_details.candid_id } }, async (err2, findCandi) => {
                console.log('findCandi', findCandi);
                await web3.eth.sendTransaction({
                    from: findVoter[0].walletAddress, // Student wallet address
                    to: findCandi[0].walletAddress, // Institute wallet address
                    value: '10'
                });
            });
        });



        // let transaction = await web3.eth.sendTransaction({
        //     from: trans_details.sender_wallet,// trans_details.sender_wallet,
        //     to: trans_details.admin_wallet,//trans_details.admin_wallet,
        //     value: '10'
        // });

        // console.log('transaction', transaction);
        // .then(function (receipt) {
        //     console.log('reciept', receipt);
        //     // balanceAmount = web3.eth.getBalance(trans_details.walletAddress);
        //     // console.log('balanceAmount', balanceAmount);

        // })
        // .catch(function (error){
        //     console.log('error', error);
        // });
    });

    Transactions.remoteMethod(
        'sendCoinToCandi', {
            description: "Do Vote",
            accepts: [
                { arg: 'trans_details', type: 'object' }
            ],
            returns: { arg: 'success', type: 'string' }
        });



    Transactions.sendCoinToVoters = ((election, cb) => {

        const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

        Transactions.app.models.voter.find({
            where: {
                election_id: election.id
            },
            include: [{
                relation: 'voter_detail'
            }]
        },
            (err, voterss) => {


                app.models.Members.find({ where: { userType: 'superadmin' } }, (err1, findAdmin) => {
                    console.log('findAdmin', findAdmin);


                    console.log('voters', JSON.stringify(voterss, null, 2));
                    const voters = JSON.parse(JSON.stringify(voterss));
                    for (let i = 0; i < voters.length; i++) {
                        console.log('voters[i].voter_detail', voters[i]);

                        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                        console.log('voters[i].voter_detail', JSON.stringify(voters[i].voter_detail));
                        app.models.Email.send({
                            to: voters[i].voter_detail.email,
                            from: 'evotingproject7@gmail.com',
                            subject: 'Start voting!!!',
                            // text: 'Coin credited to your wallet. Start voting.. Click the following link.',
                            html: '<h3>Coin credited to your wallet. Start voting.. Click the following link.</h3>\
                                <h2>\
                                    <a style="color: teal" href="http://localhost:4200/apps/election/party/party-list/vote-' + voters[i].election_id + '-' + voters[i].voter_id + '">\
                                        Start Voting\
                                    </a>\
                                </h2>'
                        }, function (err, mail) {
                            console.log('Email sent to', voters[i].voter_detail.email);
                            if (!err) {
                                console.log('mail', mail);
                            } else {
                                console.log('err', err);
                            }

                            web3.eth.sendTransaction({
                                from: findAdmin[0].walletAddress, // Institute wallet address
                                to: voters[i].voter_detail.walletAddress, // voters[i].voter_detail.
                                value: '10'
                            })
                                .then(function (receipt) {
                                    console.log('reciept', receipt);
                                });


                        });

                    }

                });


            });
    });

    Transactions.remoteMethod(
        'sendCoinToVoters', {
            description: "Send coin",
            accepts: [
                { arg: 'election', type: 'object' }
            ],
            returns: { arg: 'success', type: 'string' }
        });



};
