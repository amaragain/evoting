/* tslint:disable */
import {
  Elections,
  Candidate
} from '../index';

declare var Object: any;
export interface PartyInterface {
  "id"?: any;
  "election_id"?: any;
  election?: Elections;
  election_cand?: Candidate[];
  party_cand?: Candidate[];
}

export class Party implements PartyInterface {
  "id": any;
  "election_id": any;
  election: Elections;
  election_cand: Candidate[];
  party_cand: Candidate[];
  constructor(data?: PartyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Party`.
   */
  public static getModelName() {
    return "Party";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Party for dynamic purposes.
  **/
  public static factory(data: PartyInterface): Party{
    return new Party(data);
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
      name: 'Party',
      plural: 'Parties',
      path: 'Parties',
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
      },
      relations: {
        election: {
          name: 'election',
          type: 'Elections',
          model: 'Elections',
          relationType: 'belongsTo',
                  keyFrom: 'election_id',
          keyTo: 'id'
        },
        election_cand: {
          name: 'election_cand',
          type: 'Candidate[]',
          model: 'Candidate',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'party_id'
        },
        party_cand: {
          name: 'party_cand',
          type: 'Candidate[]',
          model: 'Candidate',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'partyId'
        },
      }
    }
  }
}
