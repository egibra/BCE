import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Record } from 'src/app/_models/record';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-record-card',
  templateUrl: './record-card.component.html',
  styleUrls: ['./record-card.component.css']
})
export class RecordCardComponent implements OnInit {

  constructor(private alertify: AlertifyService, private dataService: DataService) { }
  @Input() record: Record;
  @Output() getRecordsChange = new EventEmitter<string>();
  ngOnInit() {
  }
  deleteRecord(id: number) {
    this.alertify.confirm('Are you sure you want to delete this record?', () => {
      this.dataService.deleteRecord(id).subscribe(() => {
        this.alertify.success('Record has been deleted');
        this.getRecordsChange.emit();
      }, error => {
        this.alertify.error('Failed to delete the record');
      });
    });
  }
}
