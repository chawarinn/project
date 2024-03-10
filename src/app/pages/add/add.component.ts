import { Component } from '@angular/core';
import { RouterOutlet,RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImageModel } from '../../model/project_get';
import { User } from '../../model/project_get';
import { Constants } from '../../config/constans';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  uid: any;
  photoData: ImageModel[] = [];
  userData: User[] = [];
  username: string = '';
  email: string = '';
  password: string = '';
  confirmpassword: string = '';

  constructor( private location : Location,private http:HttpClient, private activatedRoute: ActivatedRoute, private router: Router,private constant : Constants) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.uid = params['uid'];
    });
    console.log(this.uid);
  }
  ngOnInit(): void {
    this.loadDataAsync(); 
    }
    async loadDataAsync(){ 
      const url = this.constant.API_ENDPOINT;
     
      this.http.get(url+"/photo", {}).subscribe((data:any)=>{
        this.photoData = data;
      });  
      this.http.get(url+"/users", {}).subscribe((data:any)=>{
        this.userData = data;
      });  
  }
  goback(): void{
    this.location.back();
  }
  addPhoto(){
}
// editProfile() {
//   const body = {
//     username: this.username || undefined, // เลือกใช้ข้อมูลเก่าหากไม่มีการกรอกข้อมูลใหม่
//     email: this.email || undefined, // เลือกใช้ข้อมูลเก่าหากไม่มีการกรอกข้อมูลใหม่
//     password: this.password || undefined // เลือกใช้ข้อมูลเก่าหากไม่มีการกรอกข้อมูลใหม่
//   };

//   // สร้าง URL
//   const url = this.constant.API_ENDPOINT + "/users/edit/" + this.uid;

//   // ส่งคำขอ HTTP PUT
//   this.http.put(url, body).subscribe((response) => {
//     console.log(response);
//   });
// }
passwordMismatch: boolean = false;
editProfile() {

  if (this.password !== this.confirmpassword) {
    // alert("Passwords do not match.");
    // return; 
    this.passwordMismatch = true;
      return;
  }
  this.passwordMismatch = false;
  const body = {
    username: this.username || undefined,
    email: this.email || undefined,
    password: this.password || undefined
  };

  const url = this.constant.API_ENDPOINT + "/users/edit/" + this.uid;

  this.http.put(url, body).subscribe((response) => {
    console.log(response);
    alert("update successfully");
    return;
  });
}

}