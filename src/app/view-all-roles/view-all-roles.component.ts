import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthServiceService } from '../authentication/auth-service.service';
import { Role } from '../classes/role';


@Component({
  selector: 'app-view-all-roles',
  templateUrl: './view-all-roles.component.html',
  styleUrls: ['./view-all-roles.component.scss']
})
export class ViewAllRolesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'permissions'];
  dataSource: MatTableDataSource<Role>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: AuthServiceService) {

    service.viewAllRoles().subscribe((roles: Role[]) => {
      this.dataSource = new MatTableDataSource(roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


