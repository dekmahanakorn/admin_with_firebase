## Step by Step
Set up the Firebase Project & Install @angular/fire
Please visit this post to know step by step.

Add Firebase config to environments variable
Open /src/environments/environment.ts, add your Firebase configuration that we have saved when Popup window was shown:

export const environment = {
  ...
  firebase: {
    apiKey: 'xxx',
    authDomain: 'gkz-angular-firebase.firebaseapp.com',
    databaseURL: 'https://gkz-angular-firebase.firebaseio.com',
    projectId: 'gkz-angular-firebase',
    storageBucket: 'gkz-angular-firebase.appspot.com',
    messagingSenderId: '123'
  }
};
## Create Service & Components
Run the commands below:
– ng g s customers/Customer
– ng g c customers/CustomerDetails
– ng g c customers/CustomersList
– ng g c customers/CreateCustomer

## Setup @NgModule
app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
 
import { AppComponent } from './app.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
 
@NgModule({
  declarations: [
    AppComponent,
    CustomerDetailsComponent,
    CustomersListComponent,
    CreateCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
## Create Model Class
customer.ts

export class Customer {
  key: string;
  name: string;
  age: number;
  active = true;
}
The key field is important for updating item.

## Create Data Service
customer.service.ts

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Customer } from './customer';
 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  private dbPath = '/customers';
 
  customersRef: AngularFireList<Customer> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.customersRef = db.list(this.dbPath);
  }
 
  createCustomer(customer: Customer): void {
    this.customersRef.push(customer);
  }
 
  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.update(key, value);
  }
 
  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.remove(key);
  }
 
  getCustomersList(): AngularFireList<Customer> {
    return this.customersRef;
  }
 
  deleteAll(): Promise<void> {
    return this.customersRef.remove();
  }
}
  
## Create Component for item Details
customer-details.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
 
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
 
  @Input() customer: Customer;
 
  constructor(private customerService: CustomerService) { }
 
  ngOnInit() {
  }
 
  updateActive(isActive: boolean) {
    this.customerService
      .updateCustomer(this.customer.key, { active: isActive })
      .catch(err => console.log(err));
  }
 
  deleteCustomer() {
    this.customerService
      .deleteCustomer(this.customer.key)
      .catch(err => console.log(err));
  }
 
}
customer-details.component.html

<div *ngIf="customer">
  <div>
    <label>First Name: </label> {{customer.name}}
  </div>
  <div>
    <label>Age: </label> {{customer.age}}
  </div>
  <div>
    <label>Active: </label> {{customer.active}}
  </div>
 
  <span class="button is-small btn-primary" *ngIf='customer.active' (click)='updateActive(false)'>Inactive</span>
 
  <span class="button is-small btn-primary" *ngIf='!customer.active' (click)='updateActive(true)'>Active</span>
 
  <span class="button is-small btn-danger" (click)='deleteCustomer()'>Delete</span>
 
  <hr/>
</div>
## Create Component to show List of Items
customers-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { map } from 'rxjs/operators';
 
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
 
  customers: any;
 
  constructor(private customerService: CustomerService) { }
 
  ngOnInit() {
    this.getCustomersList();
  }
 
  getCustomersList() {
    this.customerService.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.customers = customers;
    });
  }
 
  deleteCustomers() {
    this.customerService.deleteAll().catch(err => console.log(err));
  }
 
}
In the code above, we use snapshotChanges() with RxJS map() operator to get the key (Firebase id) of each item.

customers-list.component.html:

<h1>Customers</h1>
<div *ngFor="let customer of customers" style="width: 300px;">
  <app-customer-details [customer]='customer'></app-customer-details>
</div>
<div style="margin-top:20px;">
  <button type="button" class="button btn-danger" (click)='deleteCustomers()'>Delete All</button>
</div>
We pass each customer item data to customer-details component.

## Create Component to save item
create-customer.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
 
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
 
  customer: Customer = new Customer();
  submitted = false;
 
  constructor(private customerService: CustomerService) { }
 
  ngOnInit() {
  }
 
  newCustomer(): void {
    this.submitted = false;
    this.customer = new Customer();
  }
 
  save() {
    this.customerService.createCustomer(this.customer);
    this.customer = new Customer();
  }
 
  onSubmit() {
    this.submitted = true;
    this.save();
  }
 
}
create-customer.component.html:

<h3>Create Customer</h3>
<div [hidden]="submitted" style="width: 300px;">
  <form (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" required [(ngModel)]="customer.name" name="name">
    </div>
 
    <div class="form-group">
      <label for="age">Age</label>
      <input type="text" class="form-control" id="age" required [(ngModel)]="customer.age" name="age">
    </div>
 
    <button type="submit" class="btn btn-success">Submit</button>
  </form>
</div>
 
<div [hidden]="!submitted">
  <h4>You submitted successfully!</h4>
  <button class="btn btn-success" (click)="newCustomer()">Add</button>
</div>
## Define App Routing Module
app-routing.module.ts

import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomersListComponent },
  { path: 'add', component: CreateCustomerComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
app.component.html:

<div class="container-fluid">
  <div style="color: blue;">
    <h1>{{title}}</h1>
    <h3>{{description}}</h3>
  </div>
 
  <nav>
    <a routerLink="customers" class="btn btn-primary active" role="button" routerLinkActive="active">Customers</a>
    <a routerLink="add" class="btn btn-primary active" role="button" routerLinkActive="active">Add</a>
  </nav>
  <router-outlet></router-outlet>
</div>
To understand how to use Angular Routing Module, please visit:
How to work with Angular Routing – Spring Boot + Angular 4

Run & Check Result
– Run Angular App with command: npm start.
– Open browser with url http://localhost:4200/.
