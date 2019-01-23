import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { DataService } from '../_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../_models/comment';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { Record } from '../_models/record';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: Comment[];
  pagination: Pagination;
  commentForm: FormGroup;
  submitted = false;
  record: Record;
  constructor(private alertify: AlertifyService, private dataService: DataService,
    private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]]
  });
    this.route.data.subscribe(data => {
      this.comments = data['comments'].result;
      this.pagination = data['comments'].pagination;
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadComments();
  }
  loadComments() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataService.getComments(id, this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<Comment[]>) => {
        this.comments = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
  get f() { return this.commentForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentForm.invalid) {
        return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.dataService.addComment(this.commentForm.value, id).subscribe((comment: Comment) => {
      this.loadComments();
      this.alertify.success('Comment inserted successfully');

    }, error => {
      this.alertify.error(error);
    });
  }
}
