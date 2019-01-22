import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from '../_models/record';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
  getRecords(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Record[]>> {
    const paginatedResult: PaginatedResult<Record[]> = new PaginatedResult<Record[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Record[]>(this.baseUrl + 'records', { observe: 'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }
  deleteRecord(id: number) {
    return this.http.delete(this.baseUrl + 'records/' + id);
  }
}
