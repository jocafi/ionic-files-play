import {Injectable} from '@angular/core';
import {File} from '@ionic-native/file';
import {Observable} from "rxjs";

@Injectable()
export class TransactionProvider {

  constructor(private fileNavigator: File) {
  }

  /**
   * Save data in json format to the local storage (Application Data/Documents).
   *
   * @param data data to be saved in json format
   * @param filename Filename
   * @return Observable
   */
  public saveDataInLocalStorage(data: any, filename: string) : Observable<any> {
    const jsonData = JSON.stringify(data);
    console.log("saving the json: " + jsonData);
    const path =  this.fileNavigator.dataDirectory + "Documents";
    return Observable.fromPromise(this.fileNavigator.writeFile(path,
      filename,
      jsonData,
      {replace: true} ));
  }

  /**
   * read data in json format from the local storage (Application Data/Documents).
   * @param filename Filename
   * @return Observable
   */
  public readDataFromLocalStorage(filename: string): Observable<string> {
    const path =  this.fileNavigator.dataDirectory + "Documents";
    return Observable.fromPromise(this.fileNavigator.readAsText(path, filename));
  }

}
