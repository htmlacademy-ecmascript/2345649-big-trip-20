import Component from './component.js';

function createTemplate() {
  return `
  <ul class="trip-events__list">
  </ul>
`;
}

export default class EventsContainer extends Component {
  getTemplate() {
    return createTemplate();
  }
}
