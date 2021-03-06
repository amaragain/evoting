/* tslint:disable */
import {
  Party,
  Voter,
  Candidate,
  Transactions,
  Votes
} from '../index';

declare var Object: any;
export interface ElectionsInterface {
  "id"?: any;
  election_parties?: Party[];
  election_voters?: Voter[];
  election_candidates?: Candidate[];
  election_transactions?: Transactions[];
  votedElection?: Votes[];
}

export class Elections implements ElectionsInterface {
  "id": any;
  election_parties: Party[];
  election_voters: Voter[];
  election_candidates: Candidate[];
  election_transactions: Transactions[];
  votedElection: Votes[];
  constructor(data?: ElectionsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Elections`.
   */
  public static getModelName() {
    return "Elections";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Elections for dynamic purposes.
  **/
  public static factory(data: ElectionsInterface): Elections{
    return new Elections(data);
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
      name: 'Elections',
      plural: 'Elections',
      path: 'Elections',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        election_parties: {
          name: 'election_parties',
          type: 'Party[]',
          model: 'Party',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'election_id'
        },
        election_voters: {
          name: 'election_voters',
          type: 'Voter[]',
          model: 'Voter',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'election_id'
        },
        election_candidates: {
          name: 'election_candidates',
          type: 'Candidate[]',
          model: 'Candidate',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'electionId'
        },
        election_transactions: {
          name: 'election_transactions',
          type: 'Transactions[]',
          model: 'Transactions',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'election_id'
        },
        votedElection: {
          name: 'votedElection',
          type: 'Votes[]',
          model: 'Votes',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'election_id'
        },
      }
    }
  }
}
