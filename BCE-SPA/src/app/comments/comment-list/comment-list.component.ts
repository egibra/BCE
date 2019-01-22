import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { DataService } from '../../_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/_models/comment';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: Comment[];
  pagination: Pagination;
  recordForm: FormGroup;
  submitted = false;
  constructor(private alertify: AlertifyService, private dataService: DataService,
    private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.comments = data['comments'].result;
      this.pagination = data['comments'].pagination;
    });
  }
  loadComments() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataService.getRecords(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<Comment[]>) => {
        this.comments = res.result;
        alert(JSON.stringify(this.comments));
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
}
