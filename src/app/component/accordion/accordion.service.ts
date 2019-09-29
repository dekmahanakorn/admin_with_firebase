import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Asia1 } from './accordion';
import { Asia2 } from './accordion';
import { Asia3 } from './accordion';
import { Asia4 } from './accordion';

@Injectable({
  providedIn: 'root'
})
export class AccordionService {
  private dbPathAsia1 = '/packet/asia1';
  asia1Ref: AngularFireList<Asia1> = null;

  private dbPathAsia2 = '/packet/asia2';
  asia2Ref: AngularFireList<Asia2> = null;

  private dbPathAsia3 = '/packet/asia3';
  asia3Ref: AngularFireList<Asia3> = null;

  private dbPathAsia4 = '/packet/asia4';
  asia4Ref: AngularFireList<Asia4> = null;

  imageDetailList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.asia1Ref = db.list(this.dbPathAsia1);
    this.asia2Ref = db.list(this.dbPathAsia2);
    this.asia3Ref = db.list(this.dbPathAsia3);
    this.asia4Ref = db.list(this.dbPathAsia4);
  }

  //asia1
  createAsia1(asia1: Asia1): void {
    this.asia1Ref.push(asia1);
  }

  updateAsia1(key: string, value: any): Promise<void> {
    return this.asia1Ref.update(key, value);
  }

  deleteAsia1(key: string): Promise<void> {
    return this.asia1Ref.remove(key);
  }

  getAsia1List(): AngularFireList<Asia1> {
    return this.asia1Ref;
  }

  //asia2
  createAsia2(asia2: Asia2): void {
    this.asia2Ref.push(asia2);
  }

  updateAsia2(key: string, value: any): Promise<void> {
    return this.asia2Ref.update(key, value);
  }

  deleteAsia2(key: string): Promise<void> {
    return this.asia2Ref.remove(key);
  }

  getAsia2List(): AngularFireList<Asia2> {
    return this.asia2Ref;
  }

  //asia3
  createAsia3(asia3: Asia3): void {
    this.asia3Ref.push(asia3);
  }

  updateAsia3(key: string, value: any): Promise<void> {
    return this.asia3Ref.update(key, value);
  }

  deleteAsia3(key: string): Promise<void> {
    return this.asia3Ref.remove(key);
  }

  getAsia3List(): AngularFireList<Asia3> {
    return this.asia3Ref;
  }

  //asia4
  createAsia4(asia4: Asia4): void {
    this.asia4Ref.push(asia4);
  }

  updateAsia4(key: string, value: any): Promise<void> {
    return this.asia4Ref.update(key, value);
  }

  deleteAsia4(key: string): Promise<void> {
    return this.asia4Ref.remove(key);
  }

  getAsia4List(): AngularFireList<Asia4> {
    return this.asia4Ref;
  }

  //Image
  getImageDetailList() {
    this.imageDetailList = this.db.list('imageDetails');
  }

  uploadImageAsia1(imageDetails) {
    this.asia1Ref.update('-LnbrmUxduZmfmz75ea1', imageDetails);
  }

  uploadImageAsia2(imageDetails) {
    this.asia2Ref.update('-Lni0JRWc2Onnk2g_8-P', imageDetails);
  }

  uploadImageAsia3(imageDetails) {
    this.asia3Ref.update('-Lni19mQh3nKwDZBYR-9', imageDetails);
  }

  uploadImageAsia4(imageDetails) {
    this.asia4Ref.update('-Lni2-Fz_iwiXtiukoIi', imageDetails);
  }
}