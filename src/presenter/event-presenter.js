import { remove, render, replace } from '../framework/render';
import EditEventForm from '../view/event-edit-form';
import EventItem from '../view/event-item';

export default class EventPresenter {
  #eventsListContainer;
  #eventComponent;
  #eventEditComponent;
  #event;
  #destination;
  #offers;
  #handleDataChange;

  constructor({ eventsListContainer, onDataChange }) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
  }

  render(event, destination, offers) {
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventItem({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EditEventForm({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick,
    });

    if (!prevEventComponent) {
      render(this.#eventComponent, this.#eventsListContainer);
      return;
    }

    if (this.#eventsListContainer.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#eventsListContainer.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  #handleEditClick = () => {
    this.#editEvent();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#event.isFavorite = !this.#event.isFavorite;
    this.#handleDataChange(this.#event);
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
