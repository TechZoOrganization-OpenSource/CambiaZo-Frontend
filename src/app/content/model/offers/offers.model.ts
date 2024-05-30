import {Users} from "../users/users.model";

export class Offers {
  id: string;
  id_user_offers: string;
  id_product_offers: string;
  id_user_get: string;
  id_product_get: string;
  status: string;
  user_get: any;
  product_get: any;
  product_offers: any;

  constructor(
    id: string,
    id_user_offers: string,
    id_product_offers: string,
    id_user_get: string,
    id_product_get: string,
    status: string
  ) {
    this.id=id;
    this.id_user_offers=id_user_offers;
    this.id_product_offers=id_product_offers;
    this.id_user_get=id_user_get;
    this.id_product_get=id_product_get;
    this.status=status;
    this.user_get = {};
    this.product_get = {};
    this.product_offers = {};
  }
  set setUserGet(value: any) {
    this.user_get = value;
  }
  set setProductGet(value: any) {
    this.product_get = value;
  }
  set setProductOffers(value: any) {
    this.product_offers = value;
  }
}
