import { Component, OnInit, Input, Output } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DataService } from 'src/app/_services/data.service';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Record } from 'src/app/_models/record';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit {

  constructor(private alertify: AlertifyService, private dataService: DataService, private route: ActivatedRoute) { }
  @Input() comment: Comment;
  @Output() getCommentsChange = new EventEmitter<string>();
  ngOnInit() {
  }
  deleteComment(id: string) {
    const recordID = this.route.snapshot.paramMap.get('id');
    this.alertify.confirm('Are you sure you want to delete this comment?', () => {
      this.dataService.deleteComment(recordID, id).subscribe(() => {
        this.alertify.success('Comment has been deleted');
        this.getCommentsChange.emit();
      }, error => {
        this.alertify.error('Failed to comment the record');
      });
    });
  }

}
