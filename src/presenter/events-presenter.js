import { RenderPosition, render, replace } from '../framework/render';
import EventsList from '../view/events-container.js';
import EventItem from '../view/event-item.js';
import EditEventForm from '../view/event-edit-form.js';
import FilterView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import TripInfo from '../view/trip-info.js';
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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        toggleToEventView();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventItem = new EventItem({
      event,
      destination,
      offers,
      onEditClick: () => {
        editEvent();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const editEventForm = new EditEventForm({
      event,
      destination,
      offers,
      onFormSubmit: () => {
        submitEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollupClick: () => {
        toggleToEventView();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function editEvent() {
      replace(editEventForm, eventItem);
    }
    function submitEvent() {
      replace(eventItem, editEventForm);
    }
    function toggleToEventView() {
      replace(eventItem, editEventForm);
    }

    render(eventItem, this.#eventsList.element);
  }
}
