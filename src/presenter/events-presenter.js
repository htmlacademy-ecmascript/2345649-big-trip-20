import { render } from '../render.js';
import EventsList from '../view/events-container.js';
import EventItem from '../view/event-item.js';
// import NewEventForm from '../view/event-create-form.js';
import EditEventForm from '../view/event-edit-form.js';

export default class EventsPresenter {
  eventsList = new EventsList();

  constructor({ eventsContainer, eventsModel }) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.get()];

    render(this.eventsList, this.eventsContainer);

    const eventsListElement = this.eventsList.getElement();

    render(new EditEventForm({event: this.events[0]}), eventsListElement);
    for (let i = 1; i < this.events.length; i++) {
      render(new EventItem({event: this.events[i]}), eventsListElement);
    }
  }
}
