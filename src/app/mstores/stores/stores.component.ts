import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { productService } from '../../lib/service/product.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  public stores:any[];
  public storesX:any[];
  public cityName : string;
   constructor(private productService: productService,
               private activeRoute: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
      this.activeRoute.params.subscribe(params => {
          this.cityName = params["cityName"];
          this.productService.getStoreByCity(this.cityName).subscribe(data => {
              this.stores = data;
              this.storesX = this.stores.map(s=>{
                  if(s.coords){
                    const coords = s.coords.replace(" ","").split(",");
                    return { store : s, lat: parseFloat(coords[0]), lng: parseFloat(coords[1])} 
                  } 
                  else return { store : s, lat: parseFloat("50.478418"), lng: parseFloat("30.549007")}
                   });
              console.log(this.storesX);
          })
      });
  }


  onClick($event, id:number) {
    this.router.navigate(['/store-detail/'+ this.cityName + '/'+id]);
  }

}
