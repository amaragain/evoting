'use strict';
var app = require('../../server/server');
const Web3 = require('web3');

module.exports = function (Members) {


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



    Members.createVoters = function (elctionVotersDertail, cb) {
        if (elctionVotersDertail.userDetsils.MemberId == undefined) {
            console.log(elctionVotersDertail.election.title, "WE ARE")
            console.log(elctionVotersDertail, "fghjkl")


            app.models.acc_address.find({}, function (errr, accAdr) {
                console.log('accAdr', accAdr);
                let createdAccount = accAdr[0].key;
                console.log('createdAccount', createdAccount);

                app.models.acc_address.destroyAll({ 'id': accAdr[0].id }, function (err, obj) {

                });

                let data = {
                    Number: elctionVotersDertail.userDetsils.Number,
                    name: elctionVotersDertail.userDetsils.name,
                    email: elctionVotersDertail.userDetsils.email,
                    password: elctionVotersDertail.userDetsils.password,
                    UDA: elctionVotersDertail.userDetsils.UDA,
                    type: elctionVotersDertail.userDetsils.type,
                    walletAddress: createdAccount
                }


                Members.create(data, (err, res) => {
                    console.log('createVoters', res)
                    if (res) {
                        console.log(res, "nnnnnnnnnnnnnn")
                        let voterDetails = {
                            voter_id: res.id,
                            election_id: elctionVotersDertail.election.id
                        }
                        console.log(voterDetails, "hjkl")
                        app.models.voter.create(voterDetails, (err, succRes) => {

                            if (succRes) {
                                // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                                app.models.Email.send({
                                    to: res.email,
                                    from: 'evotingproject7@gmail.com',
                                    subject: 'my subject',
                                    text: 'my text',
                                    html: '<h3>Username:' + res.email + '<br>Password:' + elctionVotersDertail.userDetsils.UDA + '<br>Election</h3><br>Title:' + elctionVotersDertail.election.title +
                                        '<br>Location:' + elctionVotersDertail.election.location + '<br>Start Date:' +
                                        elctionVotersDertail.election.startDate + '<br>End Date:' + elctionVotersDertail.election.endDate
                                }, function (err, mail) {
                                    console.log('email sent!');
                                    if (!err) {
                                        cb(null, '')
                                    } else {
                                        cb(null, err)
                                    }
                                });

                            }

                        })
                    }

                });
            });



        }
        else {
            let voter_detail =
            {
                voter_id: elctionVotersDertail.userDetsils.MemberId.id,
                election_id: elctionVotersDertail.election.id
            }
            app.models.voter.create(voter_detail, (err, succRes) => {

                if (succRes) {

                    app.models.Email.send({
                        to: elctionVotersDertail.userDetsils.email,
                        from: 'evotingproject7@gmail.com',
                        subject: 'my subject',
                        text: 'my text',
                        html: '<h3>Username:' + elctionVotersDertail.userDetsils.email + '<br>Password:' + elctionVotersDertail.userDetsils.UDA + '<br>Election</h3><br>Title:' + elctionVotersDertail.election.title +
                            '<br>Location:' + elctionVotersDertail.election.location + '<br>Start Date:' +
                            elctionVotersDertail.election.startDate + '<br>End Date:' + elctionVotersDertail.election.endDate
                    }, function (err, mail) {
                        console.log('email sent!');
                        if (!err) {
                            cb(null, '')
                        } else {
                            cb(null, err)
                        }
                    });

                }

            })

        }

    }
    Members.remoteMethod(
        'createVoters', {
            description: "Create voters based on election",
            accepts: [
                { arg: 'elctionVotersDertail', type: 'object' }
            ],
            returns: { arg: 'success', type: 'string' }
        });


    Members.createCandidate = function (electionCandidateDetail, cb) {



        app.models.acc_address.find({}, function (errr, accAdr) {
            console.log('accAdr', accAdr);
            let createdAccount = accAdr[0].key;
            console.log('createdAccount', createdAccount);

            app.models.acc_address.destroyAll({ 'id': accAdr[0].id }, function (err, obj) {

            });

            let data = {
                name: electionCandidateDetail.cand_registerDetails.name,
                email: electionCandidateDetail.cand_registerDetails.email,
                password: electionCandidateDetail.cand_registerDetails.password,
                passwordConfirm: electionCandidateDetail.cand_registerDetails.passwordConfirm,
                type: electionCandidateDetail.cand_registerDetails.type,
                walletAddress: createdAccount
            }
            Members.create(data, (err, res) => {

                console.log('createCandidate', res)

                if (res) {
                    console.log(res, "nnnnnnnnnnnnnn")
                    let CandidateRegisterDetails = {
                        candidateId: res.id,
                        electionId: electionCandidateDetail.elctionDeetails.electionId,
                        partyId: electionCandidateDetail.elctionDeetails.partyId
                    }
                    console.log(CandidateRegisterDetails, "hjkl")
                    app.models.candidate.create(CandidateRegisterDetails, (err, succRes) => {

                        if (succRes) {

                            app.models.Email.send({
                                to: res.email,
                                from: 'evotingproject7@gmail.com',
                                subject: 'Election Registration',
                                text: 'You are registered successfully for the election',
                                // html: 'my <em>html</em>'
                            }, function (err, mail) {
                                console.log('email sent!');
                                if (!err) {
                                    cb(null, '')
                                } else {
                                    cb(null, err)
                                }
                            });

                        }
                    })
                }
            });
        });
    }

    Members.remoteMethod(
        'createCandidate', {
            description: "Create candidate based on election",
            accepts: [
                { arg: 'electionCandidateDetail', type: 'object' }
            ],
            returns: { arg: 'success', type: 'string' }
        });

}
