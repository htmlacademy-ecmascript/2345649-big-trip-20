export default class OffersModel {
  #service;
  #offers;

  constructor(service) {
    this.#service = service;
    this.#offers = this.#service.getOffers();
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((o) => o.type === type).offers;
  }
}
