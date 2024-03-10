import { CommonModule,Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ImageModel } from '../../model/project_get';
import { ActivatedRoute, Router, RouterOutlet,RouterLink } from '@angular/router';
import { Constants } from '../../config/constans';

@Component({
  selector: 'app-myrank',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './myrank.component.html',
  styleUrl: './myrank.component.scss'
})
export class MyrankComponent {
  uid: any;

  constructor( private location : Location,private http:HttpClient, private activatedRoute: ActivatedRoute, private router: Router,private constant : Constants) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.uid = params['uid'];
    });
    console.log(this.uid);
  }
  goback(): void{
    this.location.back();
  }
}
