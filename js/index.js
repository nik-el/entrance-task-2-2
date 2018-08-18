const MOBILE_WIDTH = 414;
let isVertical = false;

const DIRECT = {
  NEXT: {
    side: 'left',
    direction: 1,
  },
  PREV:  {
    side: 'left',
    direction: -1,
  },
  DOWN: {
    side: 'top',
    direction: 1,
  },
  UP: {
    side: 'top',
    direction: -1,
  },
};

const MODALS = {
  elegato: document.querySelector('.modal--elegato'),
  xiaomi: document.querySelector('.modal--xiaomi'),
  floor: document.querySelector('.modal--floor'),
};

//по условию размер карточки фиксирован
const CARD_WIDTH = 215;
const SUMMARY_CARD_HEIGHT = 120;


const body = document.querySelector('.body');
const header = document.querySelector('.page-header');
const main = document.querySelector('.page-main');
const footer = document.querySelector('.page-footer');


const cards = document.querySelectorAll('.card');
const controlButtons = document.querySelectorAll('.card-control__button');
const controlButtonsSummary = document.querySelectorAll('.summary__control-button');

const devicesContainer = document.querySelector('.favorite__devices');
const scenariosContainer = document.querySelector('.favorite__scenarios');
const summaryCardsContainer = document.querySelector('.summary__cards');



// scroll
const getCurrentContainer = (id) => {
  if (id === 'devices-control') {
    return devicesContainer;
  } else if (id === 'scenarios-control') {
    return scenariosContainer;
  } else if (id === 'summary-control'){
    return summaryCardsContainer;
} else {
    return null;
  }
};

const getCurrentDirect = (direct) => {
  if (direct === 'next') {
    return DIRECT.NEXT;
  } else if (direct === 'prev') {
    return DIRECT.PREV;
  }  else if (direct === 'up'){
    return DIRECT.UP;
  } else if (direct === 'down'){
    return DIRECT.DOWN;
  } else {
    return null;
  }
};

const scrollToDistance = (container, containerSize, contentSize, scrollDirect) => {
  let distance = contentSize - containerSize;

  if (container.scrollLeft > distance) {
    return
  }

  if (distance > containerSize) {
    distance = containerSize + (containerSize % CARD_WIDTH);
  }

  container.scrollBy({[scrollDirect.side]: distance * scrollDirect.direction, behavior: 'smooth' });
};


for (const control of controlButtons) {
  control.addEventListener('click', (event) => {
    const container = getCurrentContainer(event.target.dataset.id);
    const containerSize = parseFloat(getComputedStyle(container).width);
    const contentSize = parseFloat(getComputedStyle(container.querySelector('.favorite__content')).width);
    let scrollDirect = getCurrentDirect(event.target.dataset.direct);

    if (!container || !scrollDirect) {
      return
    }
    scrollToDistance(container, containerSize, contentSize, scrollDirect);
  });
}


for (const control of controlButtonsSummary) {
  control.addEventListener('click', (event) => {
    const container = getCurrentContainer(event.target.dataset.id);
    const containerSize = parseFloat(getComputedStyle(container).height);
    const contentSize = parseFloat(getComputedStyle(container.querySelector('.summary__content')).height);
    let scrollDirect = getCurrentDirect(event.target.dataset.direct);

    if (!container || !scrollDirect) {
      return
    }
    scrollToDistance(container, containerSize, contentSize, scrollDirect);

  });
}

// Modal

const modalButtons = document.querySelectorAll('.modal__button');
const modalWrapper = document.querySelector('.modal-wrapper');
let currentModal = null;

document.addEventListener('keydown', (event)=> {
  if(event.key === 'Escape' && currentModal) {
    closeModal();
  }
});

for (const button of modalButtons) {
  button.addEventListener('click', () => {
    closeModal();
  });
}

for (const card of cards) {
  card.addEventListener('click', () => {
    if (MODALS[card.dataset.id]) {
      openModal(card.dataset.id);
    }
  })
}

const toggleBlur = () => {
  header.classList.toggle('blur-active');
  main.classList.toggle('blur-active');
  footer.classList.toggle('blur-active');
  body.classList.toggle('body--modal-open');
};

const openModal = (id) => {
  currentModal = id;

  MODALS[id].classList.add('modal--show');
  MODALS[id].classList.add('zoomIn');
  modalWrapper.classList.add('modal-wrapper--show');

  toggleBlur();

  if (getCurrentWindowWidth() < MOBILE_WIDTH) {
    isVertical = true;
  } else {
    isVertical = false;
  }

  getValue(id);
};

const closeModal = () => {
  toggleBlur();

  modalWrapper.classList.remove('modal-wrapper--show');
  if (currentModal) {
    MODALS[currentModal].classList.remove('zoomIn');
    MODALS[currentModal].classList.remove('modal--show');

    currentModal = null;
  }
};

modalWrapper.addEventListener('click', (event) => {
  if (event.target.dataset.id !== 'modal-wrapper') {
    return;
  }
  closeModal();
});

// Input Range
const getCurrentWindowWidth = () => {
  let currentWindow = window
  let device = 'inner';
  if (!('innerWidth' in window )) {
    device = 'client';
    currentWindow = document.documentElement || document.body;
  }
  return currentWindow[ device+'Width' ];
};

const getValue = (id) => {
  const modalComponent = MODALS[id];
  let isTemperature = false;

  if (modalComponent.classList.contains('modal--temperature')) {
    isTemperature = true;
  }

  const range = modalComponent.querySelector('.slider-toggle__input');
  let rangeValue = 0;
  if (!range) {
    return
  }
  rangeValue = range.value;


  setValue(rangeValue, isTemperature);
};

const setValue = (value, isTemperature) => {
  const currentModal = document.querySelector('.modal--show');

  if (isTemperature) {
    const mode = currentModal.querySelector('.modal__temperature-mode');
    const temperature = value - 10;
    if (temperature > 0) {
      mode.innerText = `+${temperature}`
    } else {
      mode.innerText = temperature;
    }
  }

  const slider = currentModal.querySelector('.slider-toggle__input');
  const control = currentModal.querySelector('.slider-toggle__control');
  const field = currentModal.querySelector('.slider-toggle__field');
  const controlSize = isVertical ? parseInt(getComputedStyle(control).height) : parseInt(getComputedStyle(control).width);
  const fieldWidth = isVertical ? parseInt(getComputedStyle(field).height) - controlSize : parseInt(getComputedStyle(field).width) - controlSize;
  const controlStep = fieldWidth / slider.max;

  if (!isVertical) {
    control.style.left = `${(value * controlStep)}px`;
  } else {
    control.style.bottom = `${(value * controlStep)}px`;
  }

};
