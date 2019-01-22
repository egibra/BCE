import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { DataService } from '../_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Record } from 'src/app/_models/record';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { error } from 'util';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records: Record[];
  pagination: Pagination;
  constructor(private alertify: AlertifyService, private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
 //   this.loadUsers();
     this.route.data.subscribe(data => {
      this.records = data['records'].result;
      this.pagination = data['records'].pagination;
    });
  }
  AlertSmth() {
    this.alertify.success('Profile updated successfly');
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadRecords();
  }

  loadRecords() {
    this.dataService.getRecords(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<Record[]>) => {
        this.records = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
  removeRecord(id: number) {
    this.records.splice(this.records.findIndex(p => p.id === id), 1);
  }
}
