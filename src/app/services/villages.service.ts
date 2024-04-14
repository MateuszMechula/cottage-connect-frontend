import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {VillageDetail} from "../interfaces/village-detail";
import {VillageAdd} from "../interfaces/village-add";
import {FormControl, FormGroup} from "@angular/forms";
import {VillageAddForm, VillageAddressForm} from "../models/forms.model";
import {FormService} from "./form.service";

@Injectable({
  providedIn: 'root'
})
export class VillagesService {
  apiUrl: string = environment.apiUrl;
  private _villageAddForm: FormGroup<VillageAddForm> = this.formService.initVillageForm();
  private _villageAddressForm: FormGroup<VillageAddressForm> = this.formService.initVillageAddressForm();
  private readonly _VOIVODESHIPS: string[] = [
    'Dolnośląskie', 'Kujawsko-Pomorskie', 'Lubelskie', 'Lubuskie',
    'Łódzkie', 'Małopolskie', 'Mazowieckie', 'Opolskie',
    'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie',
    'Świętokrzyskie', 'Warmińsko-Mazurskie', 'Wielkopolskie', 'Zachodniopomorskie'
  ];

  constructor(private http: HttpClient,
              private formService: FormService) {
  }

  get VOIVODESHIPS(): string[] {
    return this._VOIVODESHIPS;
  }

  get villageAddForm(): FormGroup<VillageAddForm> {
    return this._villageAddForm;
  }

  get villageAddressForm(): FormGroup<VillageAddressForm> {
    return this._villageAddressForm;
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  getAllVillages = (): Observable<VillageDetail[]> => this.http.get<VillageDetail[]>(`${this.apiUrl}villages`);

  addVillage(): Observable<void> {
    let villageAddRequest = this.createVillage(this.villageAddForm.controls, this.villageAddressForm.controls);
    return this.http.post<void>(`${this.apiUrl}villages`, villageAddRequest);
  }

  updateVillage(villageId: number): Observable<VillageDetail> {
    let villageAddRequest = this.createVillage(this.villageAddForm.controls, this.villageAddressForm.controls);
    return this.http.patch<VillageDetail>(`${this.apiUrl}villages/${villageId}`, villageAddRequest);
  }

  deleteVillageById(villageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}villages/${villageId}`);
  }

  public createVillage(addVillageRequest: VillageAddForm, addressVillageRequest: VillageAddressForm) {
    const villageAddRequest: VillageAdd = {
      name: addVillageRequest.name.value,
      description: addVillageRequest.description.value,
      addressDTO: {
        street: addressVillageRequest.street.value,
        postalCode: addressVillageRequest.postalCode.value,
        city: addressVillageRequest.city.value,
        voivodeship: addressVillageRequest.voivodeship.value,
        country: addressVillageRequest.country.value
      }
    }
    return villageAddRequest;
  }

  resetForms() {
    this._villageAddForm.reset();
    this._villageAddressForm.reset();
  }
}

