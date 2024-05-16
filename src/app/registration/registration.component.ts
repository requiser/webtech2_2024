import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {DonorDTO, UserDTO} from '../../../models';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  toastrService = inject(ToastrService);
  activedRoute = inject(ActivatedRoute);

  userForm = this.formBuilder.group<UserDTO>({
    id: 0,
    name: '',
    gender: '',
    nationality: '',
    birthplace: '',
    birthdate: new Date().toDateString(),
    address: '',
    phone: '',
    idCard: 0,
    email: '',
    password: ''
  });

  isNewUser = true;

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];

    if (id) {
      this.isNewUser = false;
      this.userService.getOne(id).subscribe({
        next: (user) => this.userForm.setValue(user),
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  registerUser() {
    const user = this.userForm.value as UserDTO;
    if(this.isValidTAJ((user as UserDTO).idCard)) {
      if (this.isNewUser) {
        this.userService.register(user).subscribe({
          next: () => {
            this.router.navigateByUrl('/login');
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
          console.error('Hibás TAJ szám.');
          this.toastrService.error('Hibás TAJ szám.', 'Hiba')
    }
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
