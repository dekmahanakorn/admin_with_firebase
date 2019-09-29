import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { About } from './about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private dbPathAbout = '/about';
  aboutRef: AngularFireList<About> = null;

  imageDetailList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.aboutRef = db.list(this.dbPathAbout);
  }

  //review1
  createVisa(about: About): void {
    this.aboutRef.push(about);
  }

  updateAbout(key: string, value: any): Promise<void> {
    return this.aboutRef.update(key, value);
  }

  deleteAbout(key: string): Promise<void> {
    return this.aboutRef.remove(key);
  }

  getAboutList(): AngularFireList<About> {
    return this.aboutRef;
  }

  //Image
  getImageDetailList() {
    this.imageDetailList = this.db.list('imageDetails');
  }

  uploadImageAbout(imageDetails) {
    this.aboutRef.update('-LoBzWzMue9CfjukxR5y', imageDetails);
  }
}