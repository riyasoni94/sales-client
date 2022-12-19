import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cars } from 'src/app/models/Cars';


@Component({
  selector: 'app-details-popup',
  templateUrl: './details-popup.component.html',
  styleUrls: ['./details-popup.component.css']
})
export class DetailsPopupComponent {
  @Input() name: any;
  @Input() buyerDetails: any = {};
  @Input() carList: any;

  displayedColumns = ['rank', 'make', 'model', 'year', 'price','currentPrice', 'mileage', 'transmission'];
  dataSource: MatTableDataSource<Cars>;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(public activeModal: NgbActiveModal) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    console.log(this.buyerDetails);
    this.dataSource = new MatTableDataSource(this.carList);// Assign car list data to data tabel source
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
