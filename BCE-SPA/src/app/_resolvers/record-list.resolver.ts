import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Record } from '../_models/record';
import { DataService } from '../_services/data.service';
@Injectable()
export class RecordListResolver implements Resolve<Record[]> {
    pageNumber = 1;
    pageSize = 5;
    constructor(private dataService: DataService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Record[]> {
        return this.dataService.getRecords(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
