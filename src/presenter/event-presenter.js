import { render, replace } from '../framework/render';
import EditEventForm from '../view/event-edit-form';
import EventItem from '../view/event-item';

export default class EventPresenter {
  #eventsListContainer;
  #eventComponent;
  #eventEditComponent;
  #event;
  #destination;
  #offers;

  constructor({ eventsListContainer }) {
    this.#eventsListContainer = eventsListContainer;
  }

  init(event, destination, offers) {
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;

    this.#eventComponent = new EventItem({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
    });

    this.#eventEditComponent = new EditEventForm({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick,
    });

    render(this.#eventComponent, this.#eventsListContainer);
  }

  #handleEditClick = () => {
    this.#editEvent();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = () => {
    this.#submitEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleRollupClick = () => {
    this.#toggleToEventView();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#toggleToEventView();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #editEvent() {
    replace(this.#eventEditComponent, this.#eventComponent);
  }

  #submitEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
  }

  #toggleToEventView() {
    replace(this.#eventComponent, this.#eventEditComponent);
  }
}
