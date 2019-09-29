import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AccordionService } from './accordion.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ngbd-accordion-basic',
  templateUrl: 'accordion.component.html'
})
export class NgbdAccordionBasicComponent implements OnInit{
  
  closeResult: string;
  selectedFile = null;
  dbList: AngularFireList<any>;
  asia1: any;
  asia2: any;
  asia3: any;
  asia4: any;

  imgSrc : string = '/assets/images/upload.jpg';
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    category : new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })

  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private accordionService: AccordionService,private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getAsia1List();
    this.getAsia2List();
    this.getAsia3List();
    this.getAsia4List();
    this.accordionService.getImageDetailList();
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

  open4(content4) {
    this.modalService.open(content4, { size: 'lg' }).result.then((result) => {
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

  onSubmitAsia1UploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.accordionService.uploadImageAsia1(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  onSubmitAsia2UploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.accordionService.uploadImageAsia2(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  onSubmitAsia3UploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.accordionService.uploadImageAsia3(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  onSubmitAsia4UploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.accordionService.uploadImageAsia4(formValue);
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
      category: 'Asia image'
    });
    this.imgSrc =  '/assets/images/upload.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  onFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmitAsia1(form: NgForm) {
    //this.db.list("/packet/asia1").push(form.value);
    this.accordionService.updateAsia1('-LnbrmUxduZmfmz75ea1',form.value);
    this.modalService.dismissAll();
  }

  onSubmitAsia2(form: NgForm) {
    //this.db.list("/packet/asia2").push(form.value);
    this.accordionService.updateAsia2('-Lni0JRWc2Onnk2g_8-P',form.value);
    this.modalService.dismissAll();
  }

  onSubmitAsia3(form: NgForm) {
    //this.db.list("/packet/asia3").push(form.value);
    this.accordionService.updateAsia3('-Lni19mQh3nKwDZBYR-9',form.value);
    this.modalService.dismissAll();
  }

  onSubmitAsia4(form: NgForm) {
    //this.db.list("/packet/asia4").push(form.value);
    this.accordionService.updateAsia4('-Lni2-Fz_iwiXtiukoIi',form.value);
    this.modalService.dismissAll();
  }

  getAsia1List() {
    this.accordionService.getAsia1List().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(asia1 => {
      this.asia1 = asia1;
      //console.log(asia1);
    });
  }

  getAsia2List() {
    this.accordionService.getAsia2List().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(asia2 => {
      this.asia2 = asia2;
      //console.log(asia2);
    });
  }

  getAsia3List() {
    this.accordionService.getAsia3List().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(asia3 => {
      this.asia3 = asia3;
      //console.log(asia3);
    });
  }

  getAsia4List() {
    this.accordionService.getAsia4List().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(asia4 => {
      this.asia4 = asia4;
      //console.log(asia4);
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


