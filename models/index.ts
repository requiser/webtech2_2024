export interface DonorDTO {
    _id?: string,
    name: string;
    gender: string;
    nationality: string;
    birthplace: string;
    birthdate: string;
    address: string;
    phone: string;
    idCard: number;
    donation?: any;
}

export interface LocationDTO {
    _id?: string,
    name: string;
    address: string;
    active: boolean;
    donation?: any;
}

export interface DonationDTO {
    _id?: string
    donationDate: string;
    donor: DonorDTO|null;
    location: LocationDTO|null;
    can_donate: boolean;
    reason: string;
    doctor: string;
    directed: boolean;
    recipient_name: string;
    recipient_idCard: number;
}

export interface UserDTO {
  _id?: string,
  name: string;
  gender: string;
  nationality: string;
  birthplace: string;
  birthdate: string;
  address: string;
  phone: string;
  idCard: number;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AccessTokenDTO {
  accessToken: string;
}
