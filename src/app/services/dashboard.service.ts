import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    constructor(private http: HttpClient, private appService: AppService) { }


    getAllBuyer() {
        return this.http.get(this.appService.getRoute() + 'Buyers/GetAllBuyer',
            {
                responseType: 'json',
            })
    }
    getAllBuyersCars(Id: any) {

        return this.http.get(this.appService.getRoute() + 'Buyers/GetAllBuyersCars',
            {
                params: {
                    Id: Id
                },
                responseType: 'json',
            });
    }
}