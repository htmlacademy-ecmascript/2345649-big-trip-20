import { render } from '../render.js';
import EventsList from '../view/events-container.js';
import EventItem from '../view/event-item.js';
import NewEventForm from '../view/event-create-form.js';
import EditEventForm from '../view/event-edit-form.js';

export default class EventsPresenter {
  eventsList = new EventsList();

  constructor({ eventsContainer }) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(this.eventsList, this.eventsContainer);

    const eventsListElement = this.eventsList.getElement();

    render(new NewEventForm(), eventsListElement);
    render(new EditEventForm(), eventsListElement);

    for (let i = 0; i < 3; i++) {
      render(new EventItem(), eventsListElement);
    }
  }
}
