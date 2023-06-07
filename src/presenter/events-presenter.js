import { render } from '../framework/render';
import EventsList from '../view/events-container.js';
import EventItem from '../view/event-item.js';
// import NewEventForm from '../view/event-create-form.js';
import EditEventForm from '../view/event-edit-form.js';

export default class EventsPresenter {
  #eventsList = new EventsList();
  #events;
  #eventsContainer;
  #eventsModel;
  #destinationsModel;
  #offersModel;

  constructor({
    eventsContainer,
    eventsModel,
    destinationsModel,
    offersModel,
  }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#events = [...this.#eventsModel.get()];

    render(this.#eventsList, this.#eventsContainer);

    const eventsListElement = this.#eventsList.element;

    // render(
    //   new EditEventForm({
    //     event: this.#events[0],
    //     destination: this.#destinationsModel.getById(this.#events[0].destination),
    //     offers: this.#offersModel.getByType(this.#events[0].type),
    //   }),
    //   eventsListElement
    // );
    for (let i = 0; i < this.#events.length; i++) {
      render(
        new EventItem({
          event: this.#events[i],
          destination: this.#destinationsModel.getById(
            this.#events[i].destination
          ),
          offers: this.#offersModel.getByType(this.#events[i].type),
        }),
        eventsListElement
      );
    }
  }
}
