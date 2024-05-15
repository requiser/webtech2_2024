import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LocationDTO } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../services/location.service';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css'
})
export class LocationFormComponent implements OnInit {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastrService = inject(ToastrService);
  locationService = inject(LocationService);

  locationForm = this.fb.group<LocationDTO>({
    id: 0,
    name: '',
    address: '',
    active: true
  });

  isNewLocation = true;

  ngOnInit(): void {
    this.locationForm.get('locationId')?.disable();
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.isNewLocation = false;
      this.locationService.getOne(id).subscribe({
        next: location => this.locationForm.setValue(location),
        error: (err) => this.toastrService.error('Hiba a véradópontok betöltésekor', 'Hiba')
      });
    }
  }

  saveLocation() {
    const location = this.locationForm.value;

    if (this.isNewLocation) {
      this.locationService.create(location as LocationDTO).subscribe({
        next: () => {
          this.toastrService.success('Sikeres mentés', 'Siker');
          this.router.navigateByUrl('/location-list');
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Hiba a mentés során.', 'Hiba')
        }
      });
    } else {
      this.locationService.update(location as LocationDTO).subscribe({
        next: () => {
          this.toastrService.success('Sikeres mentés', 'Siker');
          this.router.navigateByUrl('/location-list');
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Hiba a mentés során.', 'Hiba')
        }
      });
    }
  }
}
