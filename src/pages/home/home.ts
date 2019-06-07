import { Component } from '@angular/core';
import { Entry, File } from '@ionic-native/file/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { EnumHelper } from '../../shared/enum-helper';
import { Action } from '../../model/actions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  action: string;
  items: Entry[];
  savedParentNativeURLs = [];
  showThumbnail = false;
  actualPath = '/';

  actionList = EnumHelper.keyValues(Action);

  myList = [{ key: 'test1', value: 'value 1'}, { key: 'test3', value: 'value 2'}]

  constructor(public navCtrl: NavController,
              public fileNavigator: File,
              public plt: Platform,
              private alertCtrl: AlertController) {
    const ROOT_DIRECTORY = 'file:///storage/emulated/0/';

    plt.ready()
      .then(() => {
        this.listDir(ROOT_DIRECTORY, '');
      });
  }

  handleError = error => {
    console.log('error reading,', error);
  }

  listDir = (path, dirName) => {
    console.log('LIST DIR called...');
    if (!this.fileNavigator) {
      console.log('NOT READY');
    } else {
      // let sysPath = this.fileNavigator.resolveLocalFilesystemUrl(path);
      this.fileNavigator.listDir(path, dirName).then(entries => {
            this.items = entries;
          })
          .catch(this.handleError);
    }
  }

  goDown = item => {
    const parentNativeURL = item.nativeURL.replace(item.name, '');
    this.savedParentNativeURLs.push(item);
    if (this.savedParentNativeURLs.length > 1) {
      this.actualPath += '/';
    }
    this.actualPath += item.name;

    this.listDir(parentNativeURL, item.name);
  }

  goUp = () => {
    // console.log('savedParentNativeURLs: %o', this.savedParentNativeURLs);
    const parentNative = this.savedParentNativeURLs.pop();
    const parentNativeURL = parentNative.nativeURL.replace(parentNative.name + '/', '');
    this.actualPath = this.actualPath.replace('/' + parentNative.name, '');
    if (this.savedParentNativeURLs.length === 0) {
      this.actualPath = '/';
    }

    this.listDir(parentNativeURL, '.');
  }

  goHome = () => {
    if (this.savedParentNativeURLs.length > 0) {
      const parentNative = this.savedParentNativeURLs[0];
      const parentNativeURL = parentNative.nativeURL.replace(parentNative.name + '/', '');
      this.listDir(parentNativeURL, '.');
      this.savedParentNativeURLs = [];
      this.actualPath = '/';
    }
  }

  executeClicked() {
    console.log('executed here...');
    this.showAction();
    switch (this.action) {
      case Action.SHOW_IMAGE_THUMBNAIL:
        this.showThumbnail = true;
        break;
      case Action.HIDE_IMAGE_THUMBNAIL:
        this.showThumbnail = false;
        break;
    }
  }

  async showAction() {
    const alert = await this.alertCtrl.create({
      header: 'Selected Action',
      subHeader: 'The selected action was: <br><br>' + this.action + '<br>thumb: ' + this.showThumbnail,
      buttons: ['Dismiss']
    });
    await alert.present();
  }

}
