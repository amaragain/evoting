/* tslint:disable */

declare var Object: any;
export interface Candidate_walletInterface {
  "coin"?: number;
  "candidate_id"?: string;
  "election_id"?: string;
  "id"?: any;
}

export class Candidate_wallet implements Candidate_walletInterface {
  "coin": number;
  "candidate_id": string;
  "election_id": string;
  "id": any;
  constructor(data?: Candidate_walletInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Candidate_wallet`.
   */
  public static getModelName() {
    return "Candidate_wallet";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Candidate_wallet for dynamic purposes.
  **/
  public static factory(data: Candidate_walletInterface): Candidate_wallet{
    return new Candidate_wallet(data);
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
      name: 'Candidate_wallet',
      plural: 'Candidate_wallets',
      path: 'Candidate_wallets',
      idName: 'id',
      properties: {
        "coin": {
          name: 'coin',
          type: 'number'
        },
        "candidate_id": {
          name: 'candidate_id',
          type: 'string'
        },
        "election_id": {
          name: 'election_id',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
