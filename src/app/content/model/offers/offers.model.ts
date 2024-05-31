export class Offers {
  id_user_offers: string;
  id_product_offers: string;
  id_user_get: string;
  id_product_get: string;
  status: string;
  id: string;

  constructor(
    id: string,
    id_user_offers: string,
    id_product_offers: string,
    id_user_get: string,
    id_product_get: string,
    status: string
  ) {
    this.id_user_offers = id_user_offers;
    this.id_product_offers = id_product_offers;
    this.id_user_get = id_user_get;
    this.id_product_get = id_product_get;
    this.status = status;
    this.id = id;
  }
}
