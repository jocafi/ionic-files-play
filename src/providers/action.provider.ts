import {Injectable} from "@angular/core";
import {TransactionProvider} from "./transaction.provider";
import {Entry, File} from "@ionic-native/file";
import {Observable} from "rxjs";
import {Transaction} from "../model/transaction.model";

@Injectable()
export class ActionProvider {

  constructor(private fileNavigator: File,
              private transactionProvider: TransactionProvider) {
  }

  public listDirectory(path: string, dirName: string): Observable<Entry[]> {
    return Observable.fromPromise(this.fileNavigator.listDir(path, dirName));
  }

  public checkDirectory(path: string, dirName: string): Observable<boolean> {
    return Observable.fromPromise(this.fileNavigator.checkDir(path, dirName));
  }

  public createJsonFile(transaction: Transaction) : Observable<any> {
      return this.transactionProvider.saveDataInLocalStorage(transaction, "transaction.json");
  }

  public readJsonFile() : Observable<string> {
    return this.transactionProvider.readDataFromLocalStorage("transaction.json");
  }
}
