import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudStorageService } from 'src/app/services/cloud-storage.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {
  docID: string;




  constructor(
    public cloud: CloudStorageService,
    public route: Router,
    public activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.docID = this.activatedRoute.snapshot.url.join().split(',')[2];
    console.log(this.docID)
    this.cloud.fetchMedia(this.docID);

  }

  ngOnDestroy() {
    this.cloud.images = [];
  }

}
