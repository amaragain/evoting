'use strict';
var app = require('../../server/server');
module.exports = function(candidate) {

    // candidate.createCandidate = function (electionCandidateDetail, cb) {
    //     console.log(electionCandidateDetail, cb,"fghjkl")
    //     let data = {
    //         name : electionCandidateDetail.cand_response.name,
    //         email: electionCandidateDetail.cand_response.email,
    //         password: electionCandidateDetail.cand_response.password,
    //         passwordConfirm:electionCandidateDetail.cand_response.passwordConfirm,
    //         electionlist:electionCandidateDetail.cand_response.electionlist,
    //         partylist :electionCandidateDetail.cand_response.partylist,
    //         type: electionCandidateDetail.cand_response.type
    //     }
    //     candidate.create(data, (err, res) => {
    //         console.log(data,"fghjkl")
    //         if (res) {
    //             console.log(res,"nnnnnnnnnnnnnn")
    //             let candidateDetails = {
    //                  CandidateId: res.id,
    //                 electionId: electionCandidateDetail.election.id
    //             }
    //             console.log(andidateDetails,"hjkl")
    //             app.models.candidate.create(candidateDetails, (err, succRes) => {

    //                 if (succRes) {

    //                     app.models.Email.send({
    //                         to: res.email,
    //                         from: 'evotingproject7@gmail.com',
    //                         subject: 'my subject',
    //                         text: 'my text',
    //                         html: 'my <em>html</em>'
    //                     }, function (err, mail) {
    //                         console.log('email sent!');
    //                         if(!err){
    //                             cb(null, '')
    //                         }else{
    //                             cb(null, err)
    //                         }
    //                     });

    //                 }

    //             })
    //         }

    //     })


//     }

//     candidate.remoteMethod(
//         'createCandidate', {
//             description: "Create candidate based on election",
//             accepts: [
//                 { arg: 'CandidateDetail', type: 'object' }
//             ],
//             returns: { arg: 'success', type: 'string' }
//         });


    // candidate.getVotes = function getVotes(datas, cb) {
    // const ds = Wsuser.dataSource;

    //     ds.connector.query(
    //         sql,
    //         [],
    //         function (err, userAllIds) {
    //             if (err) {
    //                 console.error('[Search Practitioners]', err);
    //                 cb({
    //                     message: 'This event duplicates another event on this day. Try changing the facility or shift'
    //                 });
    //             } else {

    //             });

    // }


}
