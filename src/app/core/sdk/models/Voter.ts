/* tslint:disable */
import {
  Elections,
  Members
} from '../index';

declare var Object: any;
export interface VoterInterface {
  "id"?: any;
  "election_id"?: any;
  "voter_id"?: any;
  voter?: Elections;
  voter_detail?: Members;
}

export class Voter implements VoterInterface {
  "id": any;
  "election_id": any;
  "voter_id": any;
  voter: Elections;
  voter_detail: Members;
  constructor(data?: VoterInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Voter`.
   */
  public static getModelName() {
    return "Voter";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Voter for dynamic purposes.
  **/
  public static factory(data: VoterInterface): Voter{
    return new Voter(data);
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
      name: 'Voter',
      plural: 'Voters',
      path: 'Voters',
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
        "voter_id": {
          name: 'voter_id',
          type: 'any'
        },
      },
      relations: {
        voter: {
          name: 'voter',
          type: 'Elections',
          model: 'Elections',
          relationType: 'belongsTo',
                  keyFrom: 'election_id',
          keyTo: 'id'
        },
        voter_detail: {
          name: 'voter_detail',
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
