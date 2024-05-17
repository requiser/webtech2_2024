import { Component, OnInit, inject } from '@angular/core';
import { DonorService } from '../services/donor.service';
import { DonorDTO } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../services/auth.service";
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

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
  genderChart: any;

  ngOnInit(): void {
    this.donorService.getAll().subscribe({
      next: (donors) => {
        this.donors = donors;
        const genderData = this.processGenderData(donors);
        this.renderGenderChart(genderData);
        },
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

  processGenderData(donors: DonorDTO[]): { male: number, female: number, other: number } {
    let maleCount = 0;
    let femaleCount = 0;
    let otherCount = 0;

    donors.forEach(donor => {
      switch (donor.gender.toLowerCase()) {
        case 'férfi':
          maleCount++;
          break;
        case 'nő':
          femaleCount++;
          break;
        default:
          otherCount++;
          break;
      }
    });

    return { male: maleCount, female: femaleCount, other: otherCount };
  }

  renderGenderChart(genderData: { male: number, female: number, other: number }) {
    const ctx = document.getElementById('genderChart') as HTMLCanvasElement;
    if (this.genderChart) {
      this.genderChart.destroy();
    }
    this.genderChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Férfi', 'Nő', 'Egyéb'], // Hungarian labels
        datasets: [{
          label: '# of Donors',
          data: [genderData.male, genderData.female, genderData.other],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)', // Blue
            'rgba(255, 99, 132, 0.2)', // Red
            'rgba(75, 192, 192, 0.2)'  // Green
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Donor Gender Distribution'
          }
        }
      }
    });
  }
}
