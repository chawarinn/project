import { CommonModule,Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Rank } from '../../model/project_get';
import {MatButtonModule} from '@angular/material/button';
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
  photoData: any[] = [];
  rankData: any [] = [];
  previousDayRanking: any[] = []; 

  constructor(
    private location: Location,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private constant: Constants
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.uid = params['uid'];
    });

    this.loadDataAsync();
    this.loadPreviousDayRankAsync(); 
  }

  async loadDataAsync() {
    const url = this.constant.API_ENDPOINT;
    this.http.get(url + '/photo').subscribe((data: any) => {
      this.photoData = data;
    });
  }

  async loadPreviousDayRankAsync() {
    const url = this.constant.API_ENDPOINT;
    this.http.get(url + '/photo/rank/latest').subscribe((data: any) => {
      this.rankData = data;
    });
    console.log(this.rankData);
    
}

  goback(): void {
    this.location.back();
  }
}