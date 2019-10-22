/* tslint:disable */

declare var Object: any;
export interface TransactionsInterface {
  "reciever"?: string;
  "sender"?: string;
  "election_id"?: any;
  "amount"?: string;
  "type"?: number;
  "id"?: any;
}

export class Transactions implements TransactionsInterface {
  "reciever": string;
  "sender": string;
  "election_id": any;
  "amount": string;
  "type": number;
  "id": any;
  constructor(data?: TransactionsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Transactions`.
   */
  public static getModelName() {
    return "Transactions";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Transactions for dynamic purposes.
  **/
  public static factory(data: TransactionsInterface): Transactions{
    return new Transactions(data);
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
      name: 'Transactions',
      plural: 'Transactions',
      path: 'Transactions',
      idName: 'id',
      properties: {
        "reciever": {
          name: 'reciever',
          type: 'string'
        },
        "sender": {
          name: 'sender',
          type: 'string'
        },
        "election_id": {
          name: 'election_id',
          type: 'any'
        },
        "amount": {
          name: 'amount',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'number'
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
