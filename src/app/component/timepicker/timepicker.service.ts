import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Visa } from './timepicker';

@Injectable({
  providedIn: 'root'
})
export class TimepickerService {
  private dbPathVisa = '/visa';
  visaRef: AngularFireList<Visa> = null;


  imageDetailList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.visaRef = db.list(this.dbPathVisa);
  }

  //review1
  createVisa(visa: Visa): void {
    this.visaRef.push(visa);
  }

  updateVisa(key: string, value: any): Promise<void> {
    return this.visaRef.update(key, value);
  }

  deleteVisa(key: string): Promise<void> {
    return this.visaRef.remove(key);
  }

  getVisaList(): AngularFireList<Visa> {
    return this.visaRef;
  }

  //Image
  getImageDetailList() {
    this.imageDetailList = this.db.list('imageDetails');
  }

  uploadImageVisa(imageDetails) {
    this.visaRef.update('-LoBgJIOCQiazJO76joz', imageDetails);
  }
}