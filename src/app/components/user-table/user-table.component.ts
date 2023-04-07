import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  masterColumns: string[] = [];
  detailColumns: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      const userProps = Object.keys(this.users[0]);

      this.masterColumns = userProps.filter(prop => ['name', 'gender', 'phone'].includes(prop) && this.users.some(user => user[prop]));
      this.detailColumns = userProps.filter(prop => ['email', 'street', 'city'].includes(prop) && this.users.some(user => user[prop]));
    });
  }

  onFilterChanged(): void {
    this.getUsers();
  }
}
