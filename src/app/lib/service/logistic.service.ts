import {Injectable} from "@angular/core";
import { environment } from './../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
@Injectable()
export class LogisticService {

    private deliveryApiUrl: string = environment.deliveryUrl;
    private deliveryApiKey: string = environment.deliveryApiKey;
    private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    constructor(protected http:HttpClient){}

    // getting all provinces of Ukraine
    getAreas(){
        return this.http.post(this.deliveryApiUrl,
            {"apiKey": this.deliveryApiKey,
                    "modelName": "Address",
                    "calledMethod": "getAreas",
                    "methodProperties": {}
        }, {headers: this.headers} );
    }

    getCities(){
        return this.http.post(this.deliveryApiUrl,
            {"apiKey": this.deliveryApiKey,
                "modelName": "Address",
                "calledMethod": "getCities",
                "methodProperties": {}
            }, {headers: this.headers} );
    }

    getDepartments(city){
        return this.http.post(this.deliveryApiUrl,
            {"apiKey": this.deliveryApiKey,
                "modelName": "Address",
                "calledMethod": "getWarehouses",
                "methodProperties": {"CityRef": city.Ref}
            }, {headers: this.headers} );
    }

}