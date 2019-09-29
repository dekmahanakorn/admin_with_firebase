import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Profile } from './card';
import { Popular } from './card';
import { Recommend } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private dbPathProfile = '/ui/profile';
  profileRef: AngularFireList<Profile> = null;

  private dbPathPopular = '/ui/popular';
  popularRef: AngularFireList<Popular> = null;

  private dbPathRecommend = '/ui/recommend';
  recommendRef: AngularFireList<Recommend> = null;

  imageDetailList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase){
      this.profileRef = db.list(this.dbPathProfile);
      this.popularRef = db.list(this.dbPathPopular);
      this.recommendRef = db.list(this.dbPathRecommend);
  }

  //profile
  createProfile(profile: Profile): void{
    this.profileRef.push(profile);
  }

  updateProfile(key: string,value: any): Promise<void>{
      return this.profileRef.update(key,value);
  }

  deleteProfile(key: string): Promise<void>{
      return this.profileRef.remove(key);
  }

  getProfileList(): AngularFireList<Profile>{
      return this.profileRef;
  }

  //popular
  createPopular(popular: Popular): void{
    this.popularRef.push(popular);
  }

  updatePopular(key: string,value: any): Promise<void>{
      return this.popularRef.update(key,value);
  }

  deletePopular(key: string): Promise<void>{
      return this.popularRef.remove(key);
  }

  getPopularList(): AngularFireList<Popular>{
      return this.popularRef;
  }

  //recommend
  createRecommend(recommend: Recommend): void{
    this.recommendRef.push(recommend);
  }

  updateRecommend(key: string,value: any): Promise<void>{
      return this.recommendRef.update(key,value);
  }

  deleteRecommend(key: string): Promise<void>{
      return this.recommendRef.remove(key);
  }

  getRecommendList(): AngularFireList<Recommend>{
      return this.recommendRef;
  }

  //Image
  getImageDetailList() {
    this.imageDetailList = this.db.list('imageDetails');
  }

  // insertImageDetails(imageDetails) {
  //   this.imageDetailList.push(imageDetails);
  // }

  uploadImageProfile(imageDetails) {
     this.profileRef.update('-LnaybTlj1HtkLEGlLPA',imageDetails);
   }

   uploadImagePopular(imageDetails) {
    this.popularRef.update('-Lnaz-oqYsQKW0S_CgR2',imageDetails);
  }

  uploadImageRecommend(imageDetails) {
    this.recommendRef.update('-LnayrTl4iaCzvzmZxpU',imageDetails);
  }
}
