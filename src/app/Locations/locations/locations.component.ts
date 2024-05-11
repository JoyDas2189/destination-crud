import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationsComponent } from '../add-locations/add-locations.component';
import { LocationService } from '../../Services/location.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'locationName',
    'description',
    'locationType_id',
    'isPopular',
    'isSuggested',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _locationService: LocationService,
    private _coreService: CoreService
  ) {}

  ngOnInit() {
    this.getLocationList();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openLocationForm() {
    const dialogRef = this._dialog.open(AddLocationsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getLocationList();
        }
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getLocationList() {
    this._locationService.getLocationList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  deleteLocation(id: number) {
    this._locationService.deleteLocation(id).subscribe({
      next: () => {
        this._coreService.openSnackBar('Location Deleted Successfully', 'Done');
        this.getLocationList();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
