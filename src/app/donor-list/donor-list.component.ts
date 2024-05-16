import { Component, OnInit, inject } from '@angular/core';
import { DonorService } from '../services/donor.service';
import { DonorDTO } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.css'
})
export class DonorListComponent implements OnInit {
  authService = inject(AuthService);
  donors: DonorDTO[] = [];
  donorService = inject(DonorService);
  router = inject(Router);
  toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.donorService.getAll().subscribe({
      next: (donors) => this.donors = donors,
      error: err => console.error(err)
    });
  }

  listDonationsForDonor(id: any) {
    this.router.navigate([ 'donation-of-donor', id ]);
  }

  editDonor(id: any) {
    this.router.navigate([ 'edit-donor', id ]);
  }

  deleteDonor(id: any) {
    this.donorService.delete(id).subscribe({
      next: () => {
        this.toastrService.success('Sikeres törlés', 'Siker')
        const index = this.donors.findIndex((donor) => donor._id == id);
        this.donors.splice(index, 1);
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a törlés során.', 'Hiba');
      }
    });
  }

}
