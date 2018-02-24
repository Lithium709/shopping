import { Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-prodgallery',
  templateUrl: './prodgallery.component.html',
  styleUrls: ['./prodgallery.component.scss']
})
export class ProdgalleryComponent implements OnInit {


  public gallery: any[];
  activeImageIndex: number = 0;
  constructor(
      public thisDialogRef: MatDialogRef<ProdgalleryComponent>
  ) {


  }
    onClickClose(){

        this.thisDialogRef.close('close');
    }

    ngOnInit() {
  }


    arrows(e,i){
        switch(e){
            case 'next': this.activeImageIndex = Math.min(this.gallery.length - 1, i + 1);break;
            case 'prev': this.activeImageIndex = Math.max(i - 1, 0);break;
        }
     }

}
