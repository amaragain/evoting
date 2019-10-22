/* tslint:disable */

declare var Object: any;
export interface Acc_addressInterface {
  "id"?: any;
}

export class Acc_address implements Acc_addressInterface {
  "id": any;
  constructor(data?: Acc_addressInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Acc_address`.
   */
  public static getModelName() {
    return "Acc_address";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Acc_address for dynamic purposes.
  **/
  public static factory(data: Acc_addressInterface): Acc_address{
    return new Acc_address(data);
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
      name: 'Acc_address',
      plural: 'Acc_addresses',
      path: 'Acc_addresses',
      idName: 'id',
      properties: {
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
