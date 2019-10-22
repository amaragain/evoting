/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Members } from '../../models/Members';
import { Elections } from '../../models/Elections';
import { Party } from '../../models/Party';
import { Voter } from '../../models/Voter';
import { Storage } from '../../models/Storage';
import { Container } from '../../models/Container';
import { Email } from '../../models/Email';
import { MyUser } from '../../models/MyUser';
import { Candidate } from '../../models/Candidate';
import { Wallet } from '../../models/Wallet';
import { Transactions } from '../../models/Transactions';
import { Votes } from '../../models/Votes';
import { Candidate_wallet } from '../../models/Candidate_wallet';
import { Acc_address } from '../../models/Acc_address';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Members: Members,
    Elections: Elections,
    Party: Party,
    Voter: Voter,
    Storage: Storage,
    Container: Container,
    Email: Email,
    MyUser: MyUser,
    Candidate: Candidate,
    Wallet: Wallet,
    Transactions: Transactions,
    Votes: Votes,
    Candidate_wallet: Candidate_wallet,
    Acc_address: Acc_address,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
