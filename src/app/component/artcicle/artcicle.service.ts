import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Review1 } from './artcicle';
import { Review2 } from './artcicle';
import { Review3 } from './artcicle';

@Injectable({
  providedIn: 'root'
})
export class ArtcicleService {
  private dbPathReview1 = '/review/first';
  review1Ref: AngularFireList<Review1> = null;

  private dbPathReview2 = '/review/second';
  review2Ref: AngularFireList<Review2> = null;

  private dbPathReview3 = '/review/third';
  review3Ref: AngularFireList<Review3> = null;

  imageDetailList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.review1Ref = db.list(this.dbPathReview1);
    this.review2Ref = db.list(this.dbPathReview2);
    this.review3Ref = db.list(this.dbPathReview3);
  }

  //review1
  createReview1(review1: Review1): void {
    this.review1Ref.push(review1);
  }

  updateReview1(key: string, value: any): Promise<void> {
    return this.review1Ref.update(key, value);
  }

  deleteReview1(key: string): Promise<void> {
    return this.review1Ref.remove(key);
  }

  getReview1List(): AngularFireList<Review1> {
    return this.review1Ref;
  }

  //review2
  createReview2(review2: Review2): void {
    this.review2Ref.push(review2);
  }

  updateReview2(key: string, value: any): Promise<void> {
    return this.review2Ref.update(key, value);
  }

  deleteReview2(key: string): Promise<void> {
    return this.review2Ref.remove(key);
  }

  getReview2List(): AngularFireList<Review2> {
    return this.review2Ref;
  }

  //review3
  createReview3(review3: Review3): void {
    this.review3Ref.push(review3);
  }

  updateReview3(key: string, value: any): Promise<void> {
    return this.review3Ref.update(key, value);
  }

  deleteReview3(key: string): Promise<void> {
    return this.review3Ref.remove(key);
  }

  getReview3List(): AngularFireList<Review3> {
    return this.review3Ref;
  }

  //Image
  getImageDetailList() {
    this.imageDetailList = this.db.list('imageDetails');
  }

  uploadImageReview1(imageDetails) {
    this.review1Ref.update('-LnbrmUxduZmfmz75ea1', imageDetails);
  }

  uploadImageReview2(imageDetails) {
    this.review2Ref.update('-LnbtYR_y2NrYcAzujoa', imageDetails);
  }

  uploadImageReview3(imageDetails) {
    this.review3Ref.update('-LnbtbTPrk59wDe7N9MD', imageDetails);
  }
}