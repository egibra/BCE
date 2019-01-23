import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from '../_models/record';
import { Comment } from '../_models/comment';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
  getRecords(page?, itemsPerPage?): Observable<PaginatedResult<Record[]>> {
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

  getComments(id, page?, itemsPerPage?): Observable<PaginatedResult<Comment[]>> {
    const paginatedResult: PaginatedResult<Comment[]> = new PaginatedResult<Comment[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Comment[]>(this.baseUrl + 'records/' + id + '/comments', { observe: 'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }
  getRecord(id: string) {
    return this.http.get(this.baseUrl + 'records/' + id);
  }
  deleteRecord(id: number) {
    return this.http.delete(this.baseUrl + 'records/' + id);
  }
  addRecord(record: Record) {
    return this.http.post(this.baseUrl + 'records', record);
  }
  addComment(comment: Comment, id: string) {
    return this.http.post(this.baseUrl + 'records/' + id + '/comments', comment);
  }
  deleteComment(recordID: string, commentID: string) {
    return this.http.delete(this.baseUrl + 'records/' + recordID + '/comments/' + commentID);
  }
}
