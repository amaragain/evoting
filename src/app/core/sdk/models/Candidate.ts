/* tslint:disable */
import {
  Elections,
  Party
} from '../index';

declare var Object: any;
export interface CandidateInterface {
  "election_id"?: any;
  "voter_id"?: number;
  "id"?: any;
  "party_id"?: any;
  election_candidateregister?: Elections;
  party_candidateregister?: Party;
}

export class Candidate implements CandidateInterface {
  "election_id": any;
  "voter_id": number;
  "id": any;
  "party_id": any;
  election_candidateregister: Elections;
  party_candidateregister: Party;
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
        "election_id": {
          name: 'election_id',
          type: 'any'
        },
        "voter_id": {
          name: 'voter_id',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "party_id": {
          name: 'party_id',
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
        party_candidateregister: {
          name: 'party_candidateregister',
          type: 'Party',
          model: 'Party',
          relationType: 'belongsTo',
                  keyFrom: 'party_id',
          keyTo: 'id'
        },
      }
    }
  }
}
