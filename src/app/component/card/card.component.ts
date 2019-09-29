import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { CardService } from './card.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  templateUrl: 'card.component.html'
})
export class CardsComponent implements OnInit {

  closeResult: string;
  selectedFile = null;
  dbList: AngularFireList<any>;
  profile: any;
  popular: any;
  recommend: any;

  imgSrc: string = '/assets/images/upload.jpg';
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })

  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private cardService: CardService, private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getProfileList();
    this.getPopularList();
    this.getRecommendList();
    this.resetForm();
    this.cardService.getImageDetailList();
  }

  open1(content1) {
    this.modalService.open(content1, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.resetForm();
    });
  }

  open2(content2) {
    this.modalService.open(content2, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.resetForm();
    });
  }

  open3(content3) {
    this.modalService.open(content3, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.resetForm();
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/images/upload.jpg';
      this.selectedImage = null;
    }
  }

  onSubmitProfileUploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.cardService.uploadImageProfile(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  onSubmitPopularUploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.cardService.uploadImagePopular(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  onSubmitRecommendUploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.cardService.uploadImageRecommend(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: '',
      category: 'UI'
    });
    this.imgSrc = '/assets/images/upload.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  onFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmitProfile(form: NgForm) {
    //this.db.list("/ui/profile").push(form.value);
    this.cardService.updateProfile('-LnaybTlj1HtkLEGlLPA', form.value);
    this.modalService.dismissAll();
  }

  onSubmitPopular(form: NgForm) {
    //this.db.list("ui/popular").push(form.value);
    this.cardService.updatePopular('-Lnaz-oqYsQKW0S_CgR2', form.value);
    this.modalService.dismissAll();
  }

  onSubmitRecommend(form: NgForm) {
    //this.db.list("ui/recommend").push(form.value);
    this.cardService.updateRecommend('-LnayrTl4iaCzvzmZxpU', form.value);
    this.modalService.dismissAll();
  }

  getProfileList() {
    this.cardService.getProfileList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(profile => {
      this.profile = profile;
      console.log(profile);
    });
  }

  getPopularList() {
    this.cardService.getPopularList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(popular => {
      this.popular = popular;
      console.log(popular);
    });
  }

  getRecommendList() {
    this.cardService.getRecommendList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(recommend => {
      this.recommend = recommend;
      console.log(recommend);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}


