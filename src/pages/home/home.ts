import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Action } from "../../model/actions";
import { File } from '@ionic-native/file';
import {ActionProvider} from "../../providers/action.provider";
import {Transaction} from "../../model/transaction.model";
import {Station} from "../../model/station.model";
import {IdProvider} from "../../providers/id.provider";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private static ROOT_DIRECTORY = 'file:///storage/emulated/0/';
  action: string;
  items;
  savedParentNativeURLs = [];

  constructor(public navCtrl: NavController,
              private fileNavigator: File,
              public plt: Platform,
              private actionProvider: ActionProvider,
              private idProvider: IdProvider) {

    this.savedParentNativeURLs.push(HomePage.ROOT_DIRECTORY);

    plt.ready()
      .then(() => {
        this.listDir(HomePage.ROOT_DIRECTORY, '');
      })
  }

  getActions(): string[][] {
    return Action.getKeyValues();
  }

  handleError = error => {
    console.log("error reading,", error);
  }

  listDir = (path, dirName) => {
    this.actionProvider.listDirectory(path, dirName)
      .subscribe(entries => {
        this.items = entries;
      }, this.handleError);
  };

  goDown = item => {
    const parentNativeURL = item.nativeURL.replace(item.name, "");
    this.savedParentNativeURLs.push(parentNativeURL);

    this.listDir(parentNativeURL, item.name);
  };

  goUp = () => {
    if (this.savedParentNativeURLs.length == 1) {
      console.log("Root content reached. Cannot go up.");
      this.listDir(this.savedParentNativeURLs[0], "");
      return;
    }

    const parentNativeURL = this.savedParentNativeURLs.pop();
    this.listDir(parentNativeURL, "");
  };

  executeClicked() {
    console.log("execute action: " + this.action);
    switch (this.action) {
      case Action.GO_TO_APPLICATION_DIRECTORY:
        console.log("GO_TO_APPLICATION_DIRECTORY called ...");
        this.checkDir(this.fileNavigator.dataDirectory);
        // this.savedParentNativeURLs.push(this.fileNavigator.dataDirectory);
        this.listDir(this.fileNavigator.dataDirectory, "");
        break;
      case Action.GO_TO_APPLICATION_STORAGE_DIRECTORY:
        console.log("GO_TO_APPLICATION_STORAGE_DIRECTORY called ...");
        this.checkDir(this.fileNavigator.externalDataDirectory);
        // this.savedParentNativeURLs.push(this.fileNavigator.externalDataDirectory);
        this.listDir(this.fileNavigator.externalDataDirectory, "");
        break;
      case Action.GO_TO_DOCUMENTS_DIRECTORY:
        console.log("GO_TO_DOCUMENTS_DIRECTORY called ...");
        this.checkDir(this.fileNavigator.dataDirectory, "Documents");
        // this.savedParentNativeURLs.push(this.fileNavigator.dataDirectory + "Documents");
        this.listDir(this.fileNavigator.dataDirectory, "Documents");
        break;
      case Action.CREATE_JSON_FILE:
        console.log("CREATE_JSON_FILE called ...");
        this.createJsonFile();
        break;
      case Action.READ_JSON_FILE:
        console.log("READ_JSON_FILE called ...");
        this.readJsonFile();
        break;
      default:
        console.error("Action not mapped: " + this.action);
    }
  }

  createJsonFile() {
    let transaction = new Transaction();
    let station = new Station();
    station.id = this.idProvider.generateId();
    station.name = "Santa Clara Station";
    station.address = "Hamburgstr. 22 / 68163 Mannheim";
    station.createdOn = new Date(1998,5,22, 19,12);

    transaction._id = "TR_" + this.idProvider.generateId();
    transaction.name = "Test 01";
    transaction.mailSent = false;
    transaction.attachment = "test.jpg";
    transaction.createdOn = new Date();
    transaction.station = station;

    this.actionProvider.createJsonFile(transaction).subscribe(
      result => console.log("Result of saving transaction: " + result),
      this.handleError
    );
  }

  readJsonFile() {
    let transaction = this.actionProvider.readJsonFile().subscribe(
      result => console.log(result),
      this.handleError
    );
  }

  checkDir(path: string, dirName = "") {
    console.log('Checking Directory: ' + path + dirName);
    this.actionProvider.checkDirectory(path, dirName).subscribe(
      result => {
        console.log('Directory exists');
        console.log(result);
      },
      err => console.log('Directory doesn\'t exist')
    );
  }

}
