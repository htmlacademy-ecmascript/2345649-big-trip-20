import {
  DESTINATION_COUNT,
  EVENT_COUNT,
  OFFER_COUNT,
  POINT_TYPES,
} from '../const';
import { generateDestination } from '../mock/destination';
import { generateEvent } from '../mock/event';
import { generateOffer } from '../mock/offer';
import { getRandomArrayElement, getRandomBoolean, getRandomInteger } from '../utils/utils';

export default class MockService {
  destinations = [];
  offers = [];
  events = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.events = this.generateEvents();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getEvents() {
    return this.events;
  }

  generateDestinations() {
    return Array.from({ length: DESTINATION_COUNT }, () =>
      generateDestination()
    );
  }

  generateOffers() {
    return POINT_TYPES.map((type) => ({
      type,
      offers: Array.from({ length: getRandomInteger(0, OFFER_COUNT) }, () =>
        generateOffer()
      ),
    }));
  }

  generateEvents() {
    return Array.from({ length: EVENT_COUNT }, () => {
      const type = getRandomArrayElement(POINT_TYPES);
      const destination = getRandomArrayElement(this.destinations);

      const hasOffers = getRandomBoolean();

      const offerIds = (hasOffers)
        ? this.offers.find((offer) => offer.type === type)
        : [];

      generateEvent(type, destination.id, offerIds);
    });
  }
}
