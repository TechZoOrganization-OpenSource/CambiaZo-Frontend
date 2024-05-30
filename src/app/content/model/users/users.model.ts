import {Products} from "../products/products.model";

export class Users {
  id: number;
  name: string;
  email: string;
  phone:string;
  password: string;
  membership: number;
  membership_date:string;
  img: string;
  favorites: Products[];

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    password: string,
    membership: number,
    img: string,
    favorites: Products[]
  ){
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.membership = membership;
    this.membership_date="";
    this.img = img;
    this.favorites = favorites;
  }
  set membershipDate(membership_date:string){
    this.membership_date=membership_date;
  }
}

