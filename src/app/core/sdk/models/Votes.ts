/* tslint:disable */
import {
  Members
} from '../index';

declare var Object: any;
export interface VotesInterface {
  "id"?: any;
  "candidate_id"?: any;
  "voter_id"?: any;
  "election_id"?: any;
  candidate?: Members;
  voter?: Members;
}

export class Votes implements VotesInterface {
  "id": any;
  "candidate_id": any;
  "voter_id": any;
  "election_id": any;
  candidate: Members;
  voter: Members;
  constructor(data?: VotesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Votes`.
   */
  public static getModelName() {
    return "Votes";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Votes for dynamic purposes.
  **/
  public static factory(data: VotesInterface): Votes{
    return new Votes(data);
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
      name: 'Votes',
      plural: 'Votes',
      path: 'Votes',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "candidate_id": {
          name: 'candidate_id',
          type: 'any'
        },
        "voter_id": {
          name: 'voter_id',
          type: 'any'
        },
        "election_id": {
          name: 'election_id',
          type: 'any'
        },
      },
      relations: {
        candidate: {
          name: 'candidate',
          type: 'Members',
          model: 'Members',
          relationType: 'belongsTo',
                  keyFrom: 'candidate_id',
          keyTo: 'id'
        },
        voter: {
          name: 'voter',
          type: 'Members',
          model: 'Members',
          relationType: 'belongsTo',
                  keyFrom: 'voter_id',
          keyTo: 'id'
        },
      }
    }
  }
}
