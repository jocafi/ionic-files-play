import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Action } from "../../model/actions";
import { EnumHelper } from "../../shared/enum-helper";
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  action: string;
  items;
  savedParentNativeURLs = [];

  constructor(public navCtrl: NavController, public fileNavigator: File, public plt: Platform) {
    const ROOT_DIRECTORY = 'file:///storage/emulated/0/';

    plt.ready()
      .then(() => {
        this.listDir(ROOT_DIRECTORY, '');
      })
  }

  getActions(): string[] {
    return EnumHelper.keyValues(Action);
  }

  handleError = error => {
    console.log("error reading,", error);
  }

  listDir = (path, dirName) => {
    // let sysPath = this.fileNavigator.resolveLocalFilesystemUrl(path);
    this.fileNavigator.listDir(path, dirName)
      .then(entries => {
        this.items = entries;
      })
      .catch(this.handleError);
  };

  goDown = item => {
    const parentNativeURL = item.nativeURL.replace(item.name, "");
    this.savedParentNativeURLs.push(parentNativeURL);

    this.listDir(parentNativeURL, item.name);
  };

  goUp = () => {
    const parentNativeURL = this.savedParentNativeURLs.pop();

    this.listDir(parentNativeURL, "");
  };

}
