'use strict';
var app = require('../../server/server');

module.exports = function (Votes) {


  Votes.sendResults = ((electionId, cb) => {

    let results = [];
    let resultsHtml = '';
    let electionTitle = '';




    Votes.app.models.Elections.find({
      where: {
        id: electionId
      }
    }, (err, electionDetails) => {
      electionDetails = JSON.parse(JSON.stringify(electionDetails));
      console.log('electionDetails ===> ', electionDetails)
      electionTitle = electionDetails[0].title
    })


    Votes.app.models.voter.find({
        where: {
          election_id: electionId
        },
        include: [{
          relation: 'voter_detail'
        }]
      },
      (err, voterDetails) => {
        voterDetails = JSON.parse(JSON.stringify(voterDetails));
        console.log('voterDetails ===> ', voterDetails)



        Votes.app.models.candidate.find({
            where: {
              electionId: electionId
            },
            include: [{
                relation: 'candidate_detail'
              },
              {
                relation: 'candidate_party'
              }
            ]
          },
          (err, candidateDetails) => {
            candidateDetails = JSON.parse(JSON.stringify(candidateDetails));
            console.log('candidateDetails ====>> ', candidateDetails)


            let countCandi = 0
            candidateDetails.map(candi => {
              Votes.app.models.votes.find({
                  where: {
                    and: [{
                      candidate_id: candi.candidateId
                    }, {
                      election_id: electionId
                    }]
                  },
                  include: [{
                    relation: 'candidate',
                    scope: {
                      include: [{
                        relation: 'candidate_party'
                      }]
                    }
                  }]
                },
                (err, votes) => {

                  console.log('votes ====>>>', votes)

                  results.push({
                    'CandidateName': candi['candidate_detail']['name'],
                    'PartyName': candi['candidate_party']['title'],
                    'PartyLogo': candi['candidate_party']['partyLogo'],
                    'VoteCount': votes.length
                  });
                  resultsHtml += `<p>
                                    <span>Name: </span> <span> <b>` + candi['candidate_detail']['name'] + `</b> </span><br>
                                    <span>Party: </span> <span> <b>` + candi['candidate_party']['title'] + `</b> </span><br>
                                    <span>Total Votes: </span> <span> <b>` + votes.length + `</b> </span>
                                </p> <br><br>`
                  //   console.log(' results ======================>>> ', results);

                  countCandi++;

                  if (countCandi == candidateDetails.length) {


                    for (let i = 0; i < voterDetails.length; i++) {
                      //   console.log('voterDetails[i].voter_detail', voterDetails[i], JSON.stringify(results));

                      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                      //   console.log('voterDetails[i].voter_detail', JSON.stringify(voterDetails[i].voter_detail));

                      app.models.Email.send({
                        to: voterDetails[i].voter_detail.email,
                        from: 'evotingproject7@gmail.com',
                        subject: 'Election Results',
                        html: '<h3> <u>' + electionTitle + ' </u> - Election Results</h3>\
                                <p> ' + resultsHtml + ' </p>'
                      }, function (err, mail) {
                        console.log('Email sent to', voterDetails[i].voter_detail.email);
                        if (!err) {
                          console.log('mail', mail);
                        } else {
                          console.log('err', err);
                        }


                      });

                    }

                    for (let i = 0; i < candidateDetails.length; i++) {
                      // console.log('candidateDetails[i].candidate_detail', candidateDetails[i], JSON.stringify(results));

                      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                      //   console.log('candidateDetails[i].candidate_detail', JSON.stringify(candidateDetails[i].candidate_detail));

                      app.models.Email.send({
                        to: candidateDetails[i].candidate_detail.email,
                        from: 'evotingproject7@gmail.com',
                        subject: 'Election Results',
                        html: '<h3> <u>' + electionTitle + ' </u> - Election Results</h3>\
                                  <p> ' + resultsHtml + ' </p>'
                      }, function (err, mail) {
                        console.log('Email sent to', candidateDetails[i].candidate_detail.email);
                        if (!err) {
                          console.log('mail', mail);
                        } else {
                          console.log('err', err);
                        }


                      });

                    }


                    //   cb(true);

                  } else {

                    return;

                  }


                });

            });



          })



      });



  });







  Votes.remoteMethod(
    'sendResults', {
      description: "Send election results",
      accepts: [{
        arg: 'electionId',
        type: 'string'
      }],
      returns: {
        arg: 'success',
        type: 'string'
      }
    });



};
