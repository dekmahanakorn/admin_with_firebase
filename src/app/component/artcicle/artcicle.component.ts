import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { ArtcicleService } from './artcicle.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-artcicle',
  templateUrl: './artcicle.component.html'
})
export class ArtcicleComponent implements OnInit {

  closeResult: string;
  selectedFile = null;
  dbList: AngularFireList<any>;
  review1: any;
  review2: any;
  review3: any;

  imgSrc : string = '/assets/images/upload.jpg';
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    category : new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })

  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private artcicleService: ArtcicleService,private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getReview1List();
    this.getReview2List();
    this.getReview3List();
    this.resetForm();
    this.artcicleService.getImageDetailList();
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

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '/assets/images/upload.jpg';
      this.selectedImage = null;
    }
  }

  onSubmitReview1UploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.artcicleService.uploadImageReview1(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  onSubmitReview2UploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.artcicleService.uploadImageReview2(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  onSubmitReview3UploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.artcicleService.uploadImageReview3(formValue);
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
      category: 'Review image'
    });
    this.imgSrc =  '/assets/images/upload.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  onFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmitReview1(form: NgForm) {
    //this.db.list("/review/first").push(form.value);
    this.artcicleService.updateReview1('-LnbrmUxduZmfmz75ea1',form.value);
    this.modalService.dismissAll();
  }

  onSubmitReview2(form: NgForm) {
    //this.db.list("/review/second").push(form.value);
    this.artcicleService.updateReview2('-LnbtYR_y2NrYcAzujoa',form.value);
    this.modalService.dismissAll();
  }

  onSubmitReview3(form: NgForm) {
    //this.db.list("/review/third").push(form.value);
    this.artcicleService.updateReview3('-LnbtbTPrk59wDe7N9MD',form.value);
    this.modalService.dismissAll();
  }

  getReview1List() {
    this.artcicleService.getReview1List().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(review1 => {
      this.review1 = review1;
      console.log(review1);
    });
  }

  getReview2List() {
    this.artcicleService.getReview2List().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(review2 => {
      this.review2 = review2;
      console.log(review2);
    });
  }

  getReview3List() {
    this.artcicleService.getReview3List().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(review3 => {
      this.review3 = review3;
      console.log(review3);
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


