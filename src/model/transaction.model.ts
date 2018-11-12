import {Station} from "./station.model";

export class Transaction {
  public _id: string;
  public name: string;
  public createdOn: Date;
  public station: Station;
  public attachment: string;
  public mailSent: boolean = false;
}
