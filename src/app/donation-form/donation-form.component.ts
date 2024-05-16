import { Component, OnInit, inject } from '@angular/core';
import { DonorService } from '../services/donor.service';
import { DonationDTO, DonorDTO, LocationDTO } from '../../../models';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonationService } from '../services/donation.service';
import { ToastrService } from 'ngx-toastr';
import {LocationService} from "../services/location.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './donation-form.component.html',
  styleUrl: './donation-form.component.css'
})
export class DonationFormComponent implements OnInit {
  authService = inject(AuthService);
  donorService = inject(DonorService);
  locationService = inject(LocationService);
  donationService = inject(DonationService);
  toastrService = inject(ToastrService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  fb = inject(FormBuilder);

  isNewDonation = true;

  donationForm = this.fb.group<DonationDTO>({
    id: 0,
    donor: null,
    location: null,
    donationDate: new Date().toDateString(),
    can_donate: true,
    reason: '',
    doctor: '',
    directed: false,
    recipient_name: '',
    recipient_idCard: 0
  });

  donors: DonorDTO[] = [];
  locations: LocationDTO[] = [];

  ngOnInit(): void {
      this.donationForm.get('id')?.disable();
      const id = this.route.snapshot.params['id'];

      this.donorService.getAll().subscribe({
        next: (donors) => this.donors = donors
      });
      this.locationService.getAll().subscribe({
        next: (locations) => this.locations = locations
      });

      if (id) {
        this.isNewDonation = false;
        this.donationService.getOne(id).subscribe({
          next: donation => this.donationForm.setValue(donation),
          error: (err) => this.toastrService.error('Hiba a foglalás betöltésekor', 'Hiba')
        });
      }
  }

  saveDonation() {
    const donation = this.donationForm.value;
    if(this.isValidTAJ((donation as DonationDTO).recipient_idCard) || !(donation as DonationDTO).directed){
      if (this.isNewDonation) {
        this.donationService.create(donation as DonationDTO).subscribe({
          next: () => {
            this.toastrService.success('Foglalás végrehajtva!', 'Siker');
            // @ts-ignore
            this.router.navigateByUrl('');
          },
          error: (err) => {
            console.error(err);
            this.toastrService.error('Foglalás nem sikerült.', 'Hiba');
          }
        });
      } else {
        this.donationService.update(donation as DonationDTO).subscribe({
          next: () => {
            this.toastrService.success('Sikeres mentés', 'Siker');
            this.router.navigateByUrl('');
          },
          error: (err) => {
            console.error(err);
            this.toastrService.error('Hiba a mentés során.', 'Hiba');
          }
        });
      }
    } else {
          console.error('Hibás TAJ szám.');
          this.toastrService.error('Hibás TAJ szám.', 'Hiba')
    }
  }
  isValidTAJ(idCard: number): boolean {
    const idCardStr = idCard.toString();
    if (idCardStr.length !== 9) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 8; i++) {
        const digit = parseInt(idCardStr[i]);
        sum += (i % 2 === 0) ? digit * 3 : digit * 7;
    }
    const checksum = sum % 10;
    const lastDigit = parseInt(idCardStr[8]);
    return checksum === lastDigit;
}
}
