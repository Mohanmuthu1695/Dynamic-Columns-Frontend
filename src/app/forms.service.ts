import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../environment/environment";
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormsService {
  formName = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { 
    
  }
  postJsonSchema(data: any) {
    return this.http.post<any>(environment.apiUrl + `/form/add`, data, { responseType: 'arraybuffer' as 'json' });
  }
  getData(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/form/get/${id}`);
  }
  getId() {
    return this.http.get<any>(environment.apiUrl + `/form/getID`, 
    );
  }
  postUser(data:any){
    return this.http.post<any>(environment.apiUrl + `/user/add`, data);
  }
  getUserData(tableName:any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/get/${tableName}`);
  }
}
