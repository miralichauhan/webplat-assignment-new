import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: any[] = [];
  searchText = new FormControl();
  filteredUsers: any;

  constructor(private userService: UsersService) {
    this.getUsers();
  }
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'firstname', header: 'First Name',width: '110px' },
    { field: 'lastname', header: 'Last Name',width: '110px' },
    { field: 'gender', header: 'Gender' },
    { field: 'email', header: 'Email' },
    { field: 'phoneNumber', header: 'Phone',width: '110px' },
    { field: 'birthdate', header: 'Birthdate' },
    { field: 'image', header: 'Image' },
    { field: 'edit', header: 'Edit', type: 'button' },
    { field: 'details', header: 'Details', type: 'button' }
  ];
  ngOnInit() {
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      {
        next: (response) => {
          this.users = response.users;
          this.filteredUsers = [...this.users];
          this.searchText.valueChanges
            .pipe(
              debounceTime(2000),
              distinctUntilChanged()
            )
            .subscribe((searchTerm: string) => {
              this.filteredUsers = this.users.filter(user =>
                (user?.firstName + ' ' + user?.lastName).toLowerCase().includes(searchTerm?.toLowerCase())
              );
            });
          console.log('Users fetched successfully:', this.users);
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      }
    )
  }
}
