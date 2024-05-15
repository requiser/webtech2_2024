import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserDTO } from '../../../models';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  activedRoute = inject(ActivatedRoute);

  userForm = this.formBuilder.group<UserDTO>({
    id: 0,
    name: '',
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

    if (this.isNewUser) {
      this.userService.register(user).subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
