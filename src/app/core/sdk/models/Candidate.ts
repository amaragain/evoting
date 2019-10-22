/* tslint:disable */
import {
  Elections,
  Members,
  Party,
  Votes
} from '../index';

declare var Object: any;
export interface CandidateInterface {
  "id"?: any;
  "election_id"?: any;
  "candidateId"?: any;
  "party_id"?: any;
  "partyId"?: any;
  "electionId"?: any;
  election_candidateregister?: Elections;
  candidate_detail?: Members;
  party_candidateregister?: Party;
  candidate_party?: Party;
  candidate_votes?: Votes[];
}

export class Candidate implements CandidateInterface {
  "id": any;
  "election_id": any;
  "candidateId": any;
  "party_id": any;
  "partyId": any;
  "electionId": any;
  election_candidateregister: Elections;
  candidate_detail: Members;
  party_candidateregister: Party;
  candidate_party: Party;
  candidate_votes: Votes[];
  constructor(data?: CandidateInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Candidate`.
   */
  public static getModelName() {
    return "Candidate";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Candidate for dynamic purposes.
  **/
  public static factory(data: CandidateInterface): Candidate{
    return new Candidate(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Candidate',
      plural: 'Candidates',
      path: 'Candidates',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "election_id": {
          name: 'election_id',
          type: 'any'
        },
        "candidateId": {
          name: 'candidateId',
          type: 'any'
        },
        "party_id": {
          name: 'party_id',
          type: 'any'
        },
        "partyId": {
          name: 'partyId',
          type: 'any'
        },
        "electionId": {
          name: 'electionId',
          type: 'any'
        },
      },
      relations: {
        election_candidateregister: {
          name: 'election_candidateregister',
          type: 'Elections',
          model: 'Elections',
          relationType: 'belongsTo',
                  keyFrom: 'election_id',
          keyTo: 'id'
        },
        candidate_detail: {
          name: 'candidate_detail',
          type: 'Members',
          model: 'Members',
          relationType: 'belongsTo',
                  keyFrom: 'candidateId',
          keyTo: 'id'
        },
        party_candidateregister: {
          name: 'party_candidateregister',
          type: 'Party',
          model: 'Party',
          relationType: 'belongsTo',
                  keyFrom: 'party_id',
          keyTo: 'id'
        },
        candidate_party: {
          name: 'candidate_party',
          type: 'Party',
          model: 'Party',
          relationType: 'belongsTo',
                  keyFrom: 'partyId',
          keyTo: 'id'
        },
        candidate_votes: {
          name: 'candidate_votes',
          type: 'Votes[]',
          model: 'Votes',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'candidate_id'
        },
      }
    }
  }
}
