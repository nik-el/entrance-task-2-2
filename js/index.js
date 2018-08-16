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
}
const MODALS = {
  elegato: document.querySelector('.modal--elegato'),
  xiaomi: document.querySelector('.modal--xiaomi'),
};

//по условию размер карточки фиксирован
const CARD_WIDTH = 215;
const SUMMARY_CARD_HEIGHT = 120;

const cards = document.querySelectorAll('.card');
const controlButtons = document.querySelectorAll('.card-control__button');
const controlButtonsSummary = document.querySelectorAll('.summary__control-button');
const devicesContainer = document.querySelector('.favorite__devices');
const scenariosContainer = document.querySelector('.favorite__scenarios');
const summaryCardsContainer = document.querySelector('.summary__cards');

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

  container.scrollBy({[scrollDirect.side]: distance * scrollDirect.direction, behavior: 'smooth' })
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



//-=================================

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
  card.addEventListener('click', (event) => {
    if (MODALS[card.dataset.id]) {

      // console.log(event);
      // const body = document.querySelector('body')
      // console.log(body);
      //
      // console.log('card', card.getBoundingClientRect());
      // cardRect = body.getBoundingClientRect();
      //
      // const top = event.clientY - cardRect.top;
      // const left = event.clientX - cardRect.left;
      //
      // console.log(top);
      // console.log(left);
      //
      // // document.documentElement.style.setProperty(`--card-top`, event.clientY + 'px');
      // // document.documentElement.style.setProperty(`--card-left`, event.clientX + 'px');
      // document.documentElement.style.setProperty(`--card-top`, 0 + 'px');
      // document.documentElement.style.setProperty(`--card-left`, 0 + 'px');

      openModal(card.dataset.id);
    }
  })
}







const openModal = (id) => {
  currentModal = id;

  MODALS[id].classList.add('modal--show');
  MODALS[id].classList.add('zoomIn');
  modalWrapper.classList.add('modal-wrapper--show');
  getValue(id);
};

const closeModal = () => {
  modalWrapper.classList.remove('modal-wrapper--show');
  if (currentModal) {
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

const getValue = (id) => {
  const modalComponent = MODALS[id];

  let rangeValue = 0;
  rangeValue = modalComponent.querySelector('.slider-toggle__input').value;

  setValue(rangeValue);
};

const setValue = (value, temp) => {
  const currentModal = document.querySelector('.modal--show');

  if (temp) {
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
  const controlWidth = parseInt(getComputedStyle(control).width);
  const fieldWidth = parseInt(getComputedStyle(field).width) - controlWidth;
  const controlStep = fieldWidth / slider.max;

  control.style.left = `${(value * controlStep)}px`;
};
