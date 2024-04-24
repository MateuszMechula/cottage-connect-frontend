import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  getUserPhoto(photoableId: number): Observable<string> {
    const url = `${this.apiUrl}photos/${photoableId}?type=USER`;

    return this.http.get<string[]>(url)
      .pipe(
        map(response => {
          if (response && response.length > 0) {
            return response[0];
          } else {
            throw new Error("No response or error in response.");
          }
        }),
        switchMap(photoUrl => this.http.get(photoUrl, {responseType: 'blob'})),
        map(blob => URL.createObjectURL(blob))
      );
  }

}
