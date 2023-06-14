import { remove, render, replace } from '../framework/render';
import EditEventForm from '../view/event-edit-form';
import EventItem from '../view/event-item';

const Mode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

export default class EventPresenter {
  #eventsListContainer;
  #eventComponent;
  #eventEditComponent;
  #event;
  #destination;
  #offers;
  #handleDataChange;
  #handleModeChange;
  #mode = Mode.VIEW;

  constructor({ eventsListContainer, onDataChange, onModeChange }) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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

    if (this.#mode === Mode.VIEW) {
      replace(this.#eventComponent, prevEventComponent);
    } else {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  setViewMode() {
    if (this.#mode !== Mode.VIEW) {
      this.#mode = Mode.VIEW;
      replace(this.#eventComponent, this.#eventEditComponent);
    }
  }

  #handleEditClick = () => {
    this.#setEditMode();
  };

  #handleFavoriteClick = () => {
    this.#event.isFavorite = !this.#event.isFavorite;
    this.#handleDataChange(this.#event);
  };

  #handleFormSubmit = () => {
    this.setViewMode();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleRollupClick = () => {
    this.setViewMode();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.setViewMode();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #setEditMode() {
    if (this.#mode !== Mode.EDIT) {
      this.#handleModeChange();
      replace(this.#eventEditComponent, this.#eventComponent);
      document.addEventListener('keydown', this.#escKeyDownHandler);
      this.#mode = Mode.EDIT;
    }
  }
}
