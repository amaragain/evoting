/* tslint:disable */
import {
  Party,
  Votes
} from '../index';

declare var Object: any;
export interface MembersInterface {
  "name"?: string;
  "email": string;
  "realm"?: string;
  "username"?: string;
  "emailVerified"?: boolean;
  "id"?: any;
  "candidate_id"?: any;
  "password"?: string;
  accessTokens?: any[];
  candidate_party?: Party;
  candidate_votes?: Votes[];
}

export class Members implements MembersInterface {
  "name": string;
  "email": string;
  "realm": string;
  "username": string;
  "emailVerified": boolean;
  "id": any;
  "candidate_id": any;
  "password": string;
  accessTokens: any[];
  candidate_party: Party;
  candidate_votes: Votes[];
  constructor(data?: MembersInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Members`.
   */
  public static getModelName() {
    return "Members";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Members for dynamic purposes.
  **/
  public static factory(data: MembersInterface): Members{
    return new Members(data);
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
      name: 'Members',
      plural: 'Members',
      path: 'Members',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "candidate_id": {
          name: 'candidate_id',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        candidate_party: {
          name: 'candidate_party',
          type: 'Party',
          model: 'Party',
          relationType: 'belongsTo',
                  keyFrom: 'candidate_id',
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
