import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { TimepickerService } from './timepicker.service';

@Component({
  selector: 'app-ngbd-timepicker',
  templateUrl: './timepicker.component.html',
})
export class NgbdtimepickerBasicComponent implements OnInit {

  closeResult: string;
  selectedFile = null;
  dbList: AngularFireList<any>;
  visa: any;

  imgSrc : string = '/assets/images/upload.jpg';
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    category : new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })

  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private timerpickerService: TimepickerService,private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getVisaList();
    this.resetForm();
    this.timerpickerService.getImageDetailList();
  }

  open1(content1) {
    this.modalService.open(content1, { size: 'lg' }).result.then((result) => {
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

  onSubmitVisaUploadImage(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.timerpickerService.uploadImageVisa(formValue);
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
      category: 'VISA'
    });
    this.imgSrc =  '/assets/images/upload.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  onFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmitVisa(form: NgForm) {
    //this.db.list("/visa").push(form.value);
    this.timerpickerService.updateVisa('-LoBgJIOCQiazJO76joz',form.value);
    this.modalService.dismissAll();
  }

  getVisaList() {
    this.timerpickerService.getVisaList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(visa => {
      this.visa = visa;
      console.log(visa);
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


