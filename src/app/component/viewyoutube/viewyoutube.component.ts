import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ViewYoutubeService } from './viewyoutube.service';
import { map } from 'rxjs/operators';
import getYouTubeID from 'get-youtube-id';

@Component({
  selector: 'app-viewyoutube',
  templateUrl: './viewyoutube.component.html'
})
export class ViewyoutubeComponent implements OnInit {

  dbList: AngularFireList<any>;
  youtube: any;
  youtubeR: any;
  youtubeL: any;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    url: new FormControl('', Validators.required)
  })

  player: YT.Player;
  playerR: YT.Player;
  playerL: YT.Player;
  private id: string = "";
  private id_R: string = "";
  private id_L: string = "";

  constructor(private db: AngularFireDatabase, private viewYoutubeService: ViewYoutubeService) { }

  ngOnInit() {
    this.getYoutubeListr();
    this.getYoutubeList();
    this.getYoutubeListl();
  }

  onSubmitYoutube(form: NgForm) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      //this.db.list("/view/youtube").push(form.value);
      this.viewYoutubeService.updateYoutube('-LnchPo7FQROd8V11DKi', form.value);
      this.resetForm();
    }
  }

  onSubmitYoutubeR(form: NgForm) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      //this.db.list("/view/youtubeR").push(form.value);
      this.viewYoutubeService.updateYoutubeR('-LpxwPWa7lTb_JoErrQQ', form.value);
      this.resetForm();
    }
  }

  onSubmitYoutubeL(form: NgForm) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      //this.db.list("/view/youtubeL").push(form.value);
      this.viewYoutubeService.updateYoutubeL('-LpxyI__yyrSJiKgqhjq', form.value);
      this.resetForm();
    }
  }

  savePlayer(player) {
    this.player = player;
    //console.log('Video url: ', player.getVideoUrl());
  }
  savePlayerR(playerR) {
    this.playerR = playerR;
    //console.log('Video url: ', player.getVideoUrl());
  }
  savePlayerL(playerL) {
    this.playerL = playerL;
    //console.log('Video url: ', player.getVideoUrl());
  }
  onStateChange(event) {
    //console.log('player state', event.data);
  }

  getYoutubeList() {
    this.viewYoutubeService.getYoutubeList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(youtube => {
      this.youtube = youtube;
      this.id = getYouTubeID(youtube[0].url);
    });
  }

  getYoutubeListr() {
    this.viewYoutubeService.getYoutubeListR().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(youtubeR => {
      this.youtubeR = youtubeR;
      this.id_R = getYouTubeID(youtubeR[0].url);
    });
  }
  
  getYoutubeListl() {
    this.viewYoutubeService.getYoutubeListL().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(youtubeL => {
      this.youtubeL = youtubeL;
      this.id_L = getYouTubeID(youtubeL[0].url);
    });
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      url: ''
    });
    this.isSubmitted = false;
  }
}
