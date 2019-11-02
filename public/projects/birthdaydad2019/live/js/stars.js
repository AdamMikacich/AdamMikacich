const NUM_STARS = 100;

function getRandom(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function getCoordinates() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const widthSign = Math.random() < 0.5 ? 1 : -1;
  const heightSign = Math.random() < 0.5 ? 1 : -1;
  return [widthSign * getRandom(0, width / 2), heightSign * getRandom(0, height / 2)];
}

function relocate(element) {
  const coordinates = getCoordinates();
  anime({
    targets: element,
    translateX: coordinates[0],
    translateY: coordinates[1],
    opacity: getRandom(0, 10) / 10,
    duration: 5000,
    easing: 'easeInOutSine'
  });
}

async function stars() {
  const container = document.getElementsByClassName('stars')[0];
  for (let i = 0; i < NUM_STARS; i++) {
    const element = document.createElement('div');
    element.style.opacity = 0;
    container.appendChild(element);
  }
  const elements = document.querySelectorAll('.stars div');
  for (const element of elements) {
    setInterval(() => {
      relocate(element);
    }, getRandom(5000, 20000));
  }
}

export default stars;