import EventsPresenter from './presenter/events-presenter.js';
import MockService from './service/mock-service.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const eventsElement = document.querySelector('.trip-events');

const service = new MockService();
const eventsModel = new EventsModel(service);
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);

const eventsPresenter = new EventsPresenter({
  eventsContainer: eventsElement,
  eventsModel,
  destinationsModel,
  offersModel,
});

eventsPresenter.init();
