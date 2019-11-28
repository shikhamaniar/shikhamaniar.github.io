import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../classes/user';
import { AuthServiceService } from '../../services/auth-service.service';
import { Role } from '../../classes/role';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.scss']
})
export class ViewAllUsersComponent implements OnInit {

  displayedColumns: string[] =
    ['username', 'email', 'phone',
      'fname', 'lname', 'mname', 'enabled',
      'roles', 'accountNonExpired', 'credentialsNonExpired',
      'accountNonLocked'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: AuthServiceService) {

    service.viewAllUsers().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource(users);
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
