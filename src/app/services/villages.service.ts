import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {VillageDetail} from "../interfaces/village-detail";
import {VillageAdd} from "../interfaces/village-add";

@Injectable({
  providedIn: 'root'
})
export class VillagesService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAllVillages = (): Observable<VillageDetail[]> => this.http.get<VillageDetail[]>(`${this.apiUrl}villages`);

  deleteVillageById(villageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}villages/${villageId}`);
  }

  addVillage(village: VillageAdd) {
    return this.http.post<void>(`${this.apiUrl}villages`, village);
  }
}

