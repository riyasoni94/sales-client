import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsPopupComponent } from '../details-popup/details-popup.component';
import { Buyers, } from 'src/app/models/Buyer';
import { Cars } from 'src/app/models/Cars';
import { CarBuyerMap } from 'src/app/models/CarBuyerMap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  displayedColumns = ['firstName', 'lastName', 'age', 'city', 'action']; //set columns for data table
  dataSource: MatTableDataSource<Buyers>;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  buyers: Buyers[] = [];
  buyerDetails: Buyers | any;
  carList: Cars[] = [];
  carBuyerMap: CarBuyerMap[] = [];
  searchText: string = '';

  constructor(private dashboardService: DashboardService, private authService: AuthService, private router: Router, private modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.getBuyers();//get all buyers list

  }

  getBuyers() { //Get all buyers list
    this.dashboardService.getAllBuyer().subscribe(res => {
      this.buyers = JSON.parse(JSON.stringify(res)); // stringify response
      this.dataSource = new MatTableDataSource(this.buyers); //Assign source to the datatable

      //Set the paginator and sort
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter() {
    this.searchText = this.searchText.trim(); // Remove whitespace
    this.searchText = this.searchText.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.searchText;
  }

  logOut() { // Logout from the application
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }

  OpenDetailsPopup(id: any) { // Open buyer's profile when click on view 
    this.carList = [];
    this.dashboardService.getAllBuyersCars(id).subscribe(res => {
      let resultRes = JSON.parse(JSON.stringify(res));// Stringify Json
      if (resultRes.length > 0) {
        this.carBuyerMap = resultRes;

        // Assign buyer details
        this.buyerDetails = this.carBuyerMap[0].buyer;

        this.carBuyerMap.forEach(element => {

          // Calculate ranking system
          element.car.rank = this.calculateRanking(element.car);

          //Calculate 10% Depriciation for every year
          element.car.currentPrice = this.calculateDepreciation(element.car);

          this.carList.push(element.car);
        });

        const modalRef = this.modalService.open(DetailsPopupComponent);

        // Pass buyer details to buyer profile page popup
        modalRef.componentInstance.buyerDetails = this.buyerDetails;

        // Pass interested cars details of buyer to buyer profile page popup
        modalRef.componentInstance.carList = this.carList;

      }
      else {
        alert("No Data Found");
      }
    })
  }

  /*Calculate The StantecBuyerScoreTM which is a fictional custom score based on data contained about the
    car. The lower the score, the better.*/
  calculateRanking(car: Cars) {
  //The StantecBuyerScoreTM = ((Car Model Year + Mileage) / Price) * # of previous owners
    return parseFloat((((car.year + car.mileage) / car.price) * car.previousOwners).toFixed(1));
  }
  //Calculate 10% depreciation on the car price each year since the model year
  calculateDepreciation(car: Cars) {
    return parseFloat((car.price * Math.pow((1 - 10 / 100), (new Date().getFullYear() - car.year))).toFixed(1))
  }
}






