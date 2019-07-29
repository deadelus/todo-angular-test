import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../todo';


@Injectable({
  providedIn: 'root'
})
export class TodoRepositoryService {
  private uri = environment.basepath + '/todos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.uri);
  }

  get(id): Observable<Todo> {
    const uri = this.uri + '/' + id;
    return this.http.get<Todo>(uri);
  }

  post(param): Observable<Todo> {
    const uri = this.uri;
    return this.http.post<Todo>(uri, param);
  }

  patch(id, param): Observable<Todo> {
    const uri = this.uri + '/' + id;
    return this.http.patch<Todo>(uri, param);
  }

  delete(id): Observable<any> {
    const uri = this.uri + '/' + id;
    return this.http.delete(uri);
  }
}
