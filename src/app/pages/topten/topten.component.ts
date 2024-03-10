import { CommonModule,Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ImageModel } from '../../model/project_get';
import { ActivatedRoute, Router, RouterOutlet,RouterLink } from '@angular/router';
import { Constants } from '../../config/constans';
@Component({
  selector: 'app-topten',
  standalone: true,
  imports: [CommonModule,MatButtonModule,RouterOutlet,RouterLink],
  templateUrl: './topten.component.html',
  styleUrl: './topten.component.scss'
})
export class ToptenComponent {
  uid: any;
  photoData: ImageModel[] = [];

  constructor( private location : Location,private http:HttpClient, private activatedRoute: ActivatedRoute, private router: Router,private constant : Constants) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.uid = params['uid'];
    });
    console.log(this.uid);
  }
  goback(): void{
    this.location.back();
  }
  ngOnInit(): void {
    this.loadDataAsync(); 
    }
    async loadDataAsync(){ 
      const url = this.constant.API_ENDPOINT;
     
      this.http.get(url+"/photo", {}).subscribe((data:any)=>{
        this.photoData = data;
      });
      console.log('Call Name Completed');   
  }
}