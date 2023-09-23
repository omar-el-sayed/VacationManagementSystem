import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  showDetailsModal: boolean = false;

  settings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Name',
      },
      normalizedName: {
        title: 'Normalized Name',
      },
      concurrencyStamp: {
        title: 'Concurrency Stamp',
      }
    }
  };
  data: LocalDataSource = new LocalDataSource();
  selectedArr: Array<any> = [];
  selectedUserRow: any;
  hasSelected: boolean = false;
  showConfirmModal: boolean = false;
  showSideModal: boolean = false;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.getAllRoles()?.subscribe(
      res => {
        this.data.load(res);
        this.data.refresh();
      });
  }
}
