import { Component, OnInit, inject } from '@angular/core';
import {LocationDTO} from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {LocationService} from "../services/location.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent implements OnInit {
  locations: LocationDTO[] = [];
  authService = inject(AuthService);
  locationService = inject(LocationService);
  router = inject(Router);
  toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.locationService.getAll().subscribe({
      next: (locations) => this.locations = locations,
      error: err => console.error(err)
    });
  }

  listDonationsForLocation(id: any) {
    this.router.navigate([ 'donation-of-location', id ]);
  }

  editLocation(id: any) {
    this.router.navigate([ 'edit-location', id ]);
  }

  deleteLocation(id: any) {
    this.locationService.delete(id).subscribe({
      next: () => {
        this.toastrService.success('Sikeres törlés', 'Siker')
        const index = this.locations.findIndex((location) => location._id == id);
        this.locations.splice(index, 1);
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a törlés során.', 'Hiba');
      }
    });
  }

}
