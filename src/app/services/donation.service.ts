import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {DonationDTO} from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  http = inject(HttpClient);

  create(doantion: DonationDTO) {
    return this.http.post<DonationDTO>('/api/donation', doantion);
  }

  getDonationsOfDonor(donorId: number) {
    return this.http.get<DonationDTO[]>('/api/donation/of/donor/' + donorId);
  }

  getOne(id: number) {
    return this.http.get<DonationDTO>('/api/donation/' + id);
  }

  getDonationsOfLocation(locationId: number) {
    return this.http.get<DonationDTO[]>('/api/donation/of/location/' + locationId);
  }

  update(donation: DonationDTO) {
    return this.http.put<DonationDTO>('/api/donation', donation);
  }

  delete(id: number) {
    return this.http.delete('/api/donation/' + id);
  }
  getAll() {
    return this.http.get<DonationDTO[]>('/api/donation');
  }
}
