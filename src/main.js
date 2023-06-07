import { render, RenderPosition } from './render.js';
import FilterView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import TripInfo from './view/trip-info.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import MockService from './service/mock-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const tripElement = document.querySelector('.trip-main');
const filtersElement = tripElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const service = new MockService();
const eventsModel = new EventsModel(service);
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);

const eventsPresenter = new EventsPresenter({
  eventsContainer: eventsElement,
  eventsModel,
  destinationsModel,
  offersModel
});

render(new TripInfo(), tripElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filtersElement);
render(new SortView(), eventsElement);

eventsPresenter.init();
