import { render } from '../render.js';
import EventsList from '../view/events-container.js';
import EventItem from '../view/event-item.js';
// import NewEventForm from '../view/event-create-form.js';
// import EditEventForm from '../view/event-edit-form.js';
import Model from '../model/events-model.js';

const events = new Model().getEvents();
export default class EventsPresenter {
  eventsList = new EventsList();

  constructor({ eventsContainer }) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(this.eventsList, this.eventsContainer);

    const eventsListElement = this.eventsList.getElement();

    // render(new EditEventForm(Model[0]), eventsListElement);
    for (let i = 1; i < events.length; i++) {
      render(new EventItem(events[i]), eventsListElement);
    }
  }
}
