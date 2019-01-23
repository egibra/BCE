import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { DataService } from '../_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Record } from 'src/app/_models/record';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records: Record[];
  pagination: Pagination;
  recordForm: FormGroup;
  submitted = false;
  constructor(private alertify: AlertifyService, private dataService: DataService,
    private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recordForm = this.formBuilder.group({
      title: ['', [Validators.required, , Validators.maxLength(20)]],
      content: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]]
  });

     this.route.data.subscribe(data => {
       console.log(data);
      this.records = data['records'].result;
      this.pagination = data['records'].pagination;
    });
  }
  get f() { return this.recordForm.controls; }

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
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.recordForm.invalid) {
        return;
    }
    this.dataService.addRecord(this.recordForm.value).subscribe((record: Record) => {
      this.loadRecords();
      this.alertify.success('Record inserted successfully');

    }, error => {
      this.alertify.error(error);
    });
  }
}
