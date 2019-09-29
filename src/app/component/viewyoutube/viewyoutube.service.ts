import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Youtube } from './viewyoutube';

@Injectable({
  providedIn: 'root'
})
export class ViewYoutubeService {

  private dbPathYoutube = '/view/youtube';
  private dbPathYoutubeR = '/view/youtubeR';
  private dbPathYoutubeL = '/view/youtubeL';
  youtubeRef: AngularFireList<Youtube> = null;
  youtubeRefr: AngularFireList<Youtube> = null;
  youtubeRefl: AngularFireList<Youtube> = null;

  constructor(private db: AngularFireDatabase){
      this.youtubeRef = db.list(this.dbPathYoutube);
      this.youtubeRefr = db.list(this.dbPathYoutubeR);
      this.youtubeRefl = db.list(this.dbPathYoutubeL);
  }

  //Youtube center
  createYoutube(youtube: Youtube): void{
    this.youtubeRef.push(youtube);
  }

  updateYoutube(key: string,value: any): Promise<void>{
      return this.youtubeRef.update(key,value);
  }

  deleteYoutube(key: string): Promise<void>{
      return this.youtubeRef.remove(key);
  }

  getYoutubeList(): AngularFireList<Youtube>{
      return this.youtubeRef;
  }

  //Youtube right
  createYoutubeR(youtube: Youtube): void{
    this.youtubeRefr.push(youtube);
  }

  updateYoutubeR(key: string,value: any): Promise<void>{
      return this.youtubeRefr.update(key,value);
  }

  deleteYoutubeR(key: string): Promise<void>{
      return this.youtubeRefr.remove(key);
  }

  getYoutubeListR(): AngularFireList<Youtube>{
      return this.youtubeRefr;
  }
  //Youtube left
  createYoutubel(youtube: Youtube): void{
    this.youtubeRefl.push(youtube);
  }

  updateYoutubeL(key: string,value: any): Promise<void>{
      return this.youtubeRefl.update(key,value);
  }

  deleteYoutubeL(key: string): Promise<void>{
      return this.youtubeRefl.remove(key);
  }

  getYoutubeListL(): AngularFireList<Youtube>{
      return this.youtubeRefl;
  }
}
