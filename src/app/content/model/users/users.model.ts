export class Users {
  id: number;
  name: string;
  email: string;
  phone:string;
  city: string;
  membership: number;
  img: string;

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    city: string,
    membership: number,
    img: string
  ){
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.membership = membership;
    this.img = img;
  }
}
