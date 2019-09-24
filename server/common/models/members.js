'use strict';
var app = require('../../server/server');

module.exports = function (Members) {


    Members.createVoters = function (elctionVotersDertail, cb) {
        if(elctionVotersDertail.userDetsils.MemberId == undefined)
        {
        console.log(elctionVotersDertail.election.title,"WE ARE")
        console.log(elctionVotersDertail, "fghjkl")
        let data = {
            Number: elctionVotersDertail.userDetsils.Number,
            name: elctionVotersDertail.userDetsils.name,
            email: elctionVotersDertail.userDetsils.email,
            password: elctionVotersDertail.userDetsils.password,
            UDA:elctionVotersDertail.userDetsils.UDA,
            type: elctionVotersDertail.userDetsils.type
        }

        Members.create(data, (err, res) => {
            console.log(data, "fghjkl")
            if (res) {
                console.log(res, "nnnnnnnnnnnnnn")
                let voterDetails = {
                    voter_id: res.id,
                    election_id: elctionVotersDertail.election.id
                }
                console.log(voterDetails, "hjkl")
                app.models.voter.create(voterDetails, (err, succRes) => {

                    if (succRes) {

                        app.models.Email.send({
                            to: res.email,
                            from: 'minnu123suresh@gmail.com',
                            subject: 'my subject',
                            text: 'my text',
                            html: '<h3>Username:'+res.email+'<br>Password:'+elctionVotersDertail.userDetsils.UDA+'<br>Election</h3><br>Title:'+elctionVotersDertail.election.title+
                            '<br>Location:'+elctionVotersDertail.election.location+'<br>Start Date:'+
                            elctionVotersDertail.election.startDate+'<br>End Date:'+elctionVotersDertail.election.endDate
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

        })
    }
    else{
        let voter_detail=
        {
            voter_id:elctionVotersDertail.userDetsils.MemberId.id,
        election_id: elctionVotersDertail.election.id
    }
    app.models.voter.create(voter_detail, (err, succRes) => {

        if (succRes) {

            app.models.Email.send({
                to: elctionVotersDertail.userDetsils.email,
                from: 'minnu123suresh@gmail.com',
                subject: 'my subject',
                text: 'my text',
                html: '<h3>Username:'+elctionVotersDertail.userDetsils.email+'<br>Password:'+elctionVotersDertail.userDetsils.UDA+'<br>Election</h3><br>Title:'+elctionVotersDertail.election.title+
                '<br>Location:'+elctionVotersDertail.election.location+'<br>Start Date:'+
                elctionVotersDertail.election.startDate+'<br>End Date:'+elctionVotersDertail.election.endDate
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
       
        let data = {
            name: electionCandidateDetail.cand_registerDetails.name,
            email: electionCandidateDetail.cand_registerDetails.email,
            password: electionCandidateDetail.cand_registerDetails.password,
            passwordConfirm: electionCandidateDetail.cand_registerDetails.passwordConfirm,
            type: electionCandidateDetail.cand_registerDetails.type
        }
        Members.create(data, (err, res) => {

            // console.log(err, "eeeeeeeee")


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
                            from: 'minnu123suresh@gmail.com',
                            subject: 'my subject',
                            text: 'my text',
                            html: 'my <em>html</em>'
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

        })
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
