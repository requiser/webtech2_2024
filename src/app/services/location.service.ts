import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LocationDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<LocationDTO[]>('/api/location');
  }

  getOne(id: any) {
    return this.http.get<LocationDTO>('/api/location/' + id);
  }

  create(location: LocationDTO) {
    return this.http.post<LocationDTO>('/api/location', location);
  }

  update(location: LocationDTO) {
    return this.http.put<LocationDTO>('/api/location', location);
  }

  delete(id: any) {
    return this.http.delete('/api/location/' + id);
  }
}
