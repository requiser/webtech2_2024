import { Component, OnInit, inject } from '@angular/core';
import { DonationService } from '../services/donation.service';
import { DonationDTO } from '../../../models';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import {waitForAsync} from "@angular/core/testing";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css'
})
export class DonationListComponent implements OnInit {
  authService = inject(AuthService);
  donationService = inject(DonationService);
  toastrService = inject(ToastrService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  donations: DonationDTO[] = [];

  ngOnInit(): void {
    const donorId = this.route.snapshot.params['donorId'];
    const locationId = this.route.snapshot.params['locationId'];

    if (donorId!==undefined){
      this.donationService.getDonationsOfDonor(donorId).subscribe({
        next: (trans) => this.donations = trans,
        error: err => {
          console.error(err);
          this.toastrService.error('Hiba a betöltés során.', 'Hiba');
        }
    });
    }
    else if (locationId!==undefined) {
      this.donationService.getDonationsOfLocation(locationId).subscribe({
        next: (trans) => this.donations = trans,
        error: err => {
          console.error(err);
          this.toastrService.error('Hiba a betöltés során.', 'Hiba');
        }
      });
    }
    else {
      this.donationService.getAll().subscribe({
      next: (donations) => this.donations = donations,
      error: err => console.error(err)
    });
    }
  }

  editDonation(id: number) {
    this.router.navigate([ 'edit-donation', id ]);
  }

  deleteDonation(id: number) {
    this.donationService.delete(id).subscribe({
      next: () => {
        this.toastrService.success('Sikeres törlés', 'Siker')
        const index = this.donations.findIndex((donation) => donation.id == id);
        this.donations.splice(index, 1);
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a törlés során.', 'Hiba');
      }
    });
  }
}
