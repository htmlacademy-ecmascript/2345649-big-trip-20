export default class EventsModel {
  #events;
  #service;

  constructor (service) {
    this.#service = service;
    this.#events = this.#service.getEvents();
  }

  get() {
    return this.#events;
  }
}
