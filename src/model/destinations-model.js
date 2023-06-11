export default class DestinationsModel {
  #service;
  #destinations;

  constructor(service) {
    this.#service = service;
    this.#destinations = this.#service.getDestinations();
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((dest) => dest.id === id);
  }
}
