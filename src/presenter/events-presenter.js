import { RenderPosition, render } from '../framework/render';
import { updateItem } from '../utils/utils';
import EventsList from '../view/events-container.js';
import FilterView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import TripInfo from '../view/trip-info.js';
import EventPresenter from './event-presenter';

export default class EventsPresenter {
  #eventsList = new EventsList();
  #events;
  #eventsContainer;
  #eventsModel;
  #destinationsModel;
  #offersModel;
  #eventPresenters = new Map();

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

    const tripElement = document.querySelector('.trip-main');
    const filtersElement = tripElement.querySelector('.trip-controls__filters');

    this.#renderBoard(tripElement, filtersElement);
  }

  #renderBoard(tripElement, filtersElement) {
    render(new TripInfo(), tripElement, RenderPosition.AFTERBEGIN);
    render(new FilterView(), filtersElement);
    render(new SortView(), this.#eventsContainer);
    render(this.#eventsList, this.#eventsContainer);

    this.#renderEvents();
  }

  #renderEvents() {
    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i]);
    }
  }

  #renderEvent(event) {
    const destination = this.#destinationsModel.getById(event.destination);
    const offers = this.#offersModel.getByType(event.type);
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsList.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });

    this.#eventPresenters.set(event.id, eventPresenter);

    eventPresenter.render(event, destination, offers);
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.setViewMode());
  };

  #handleEventChange = (updatedEvent) => {
    const destination = this.#destinationsModel.getById(
      updatedEvent.destination
    );
    const offers = this.#offersModel.getByType(updatedEvent.type);
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters
      .get(updatedEvent.id)
      .render(updatedEvent, destination, offers);
  };
}
