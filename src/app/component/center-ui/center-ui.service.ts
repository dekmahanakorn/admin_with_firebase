import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { center1, center2, center3 } from './center-ui';

@Injectable({
  providedIn: 'root'
})
export class CenterUiService {

  private dbPathC1 = '/ui/center1';
  center1Ref: AngularFireList<center1> = null;

  private dbPathC2 = '/ui/center2';
  center2Ref: AngularFireList<center2> = null;

  private dbPathC3 = '/ui/center3';
  center3Ref: AngularFireList<center3> = null;

  imageDetailList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase){
      this.center1Ref = db.list(this.dbPathC1);
      this.center2Ref = db.list(this.dbPathC2);
      this.center3Ref = db.list(this.dbPathC3);
  }

  //center1
  createCenter1(center1: center1): void{
    this.center1Ref.push(center1);
  }

  updateCenter1(key: string,value: any): Promise<void>{
      return this.center1Ref.update(key,value);
  }

  deleteCenter1(key: string): Promise<void>{
      return this.center1Ref.remove(key);
  }

  getCenter1List(): AngularFireList<center1>{
      return this.center1Ref;
  }

  //center2
  createCenter2(center2: center2): void{
    this.center2Ref.push(center2);
  }

  updateCenter2(key: string,value: any): Promise<void>{
      return this.center2Ref.update(key,value);
  }

  deleteCenter2(key: string): Promise<void>{
      return this.center2Ref.remove(key);
  }

  getCenter2List(): AngularFireList<center2>{
      return this.center2Ref;
  }

  //center3
  createCenter3(center3: center3): void{
    this.center3Ref.push(center3);
  }

  updateCenter3(key: string,value: any): Promise<void>{
      return this.center3Ref.update(key,value);
  }

  deleteCenter3(key: string): Promise<void>{
      return this.center3Ref.remove(key);
  }

  getCenter3List(): AngularFireList<center3>{
      return this.center3Ref;
  }

  //Image
  getImageDetailList() {
    this.imageDetailList = this.db.list('imageDetails');
  }

  uploadImageC1(imageDetails) {
     this.center1Ref.update('-LoHIw9QUWKbpNx7yprQ',imageDetails);
   }

   uploadImageC2(imageDetails) {
    this.center2Ref.update('-LoHIR7r6a6ER6aumrvT',imageDetails);
  }

  uploadImageC3(imageDetails) {
    this.center3Ref.update('-LoHHgUexiLln1KyfzvT',imageDetails);
  }
}
