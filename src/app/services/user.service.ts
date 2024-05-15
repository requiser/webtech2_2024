import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {AccessTokenDTO, LoginDTO, UserDTO} from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  getOne(id: number) {
    return this.http.get<UserDTO>('/api/user/' + id);
  }

  register(user: UserDTO) {
    return this.http.post<UserDTO>('/api/user/register', user);
  }

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('/api/user/login', data);
  }

}
