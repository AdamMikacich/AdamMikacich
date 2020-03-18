import utils from './utils.js';

async function loadBackground() {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.onload = () => {
      resolve();
    };
    img.src = './../imgs/bg.jpg';
  });
}

async function splash() {
  console.time('background');
  await loadBackground();
  console.timeEnd('background');

  await utils.pause(500);

  anime({
    targets: '.projects',
    opacity: 1,
    duration: 500,
    easing: 'easeOutSine'
  });

  await utils.pause(1000);

  anime({
    targets: '.projects',
    translateY: '50vh',
    duration: 2000,
    complete: function() {
      document.querySelector('.projects').style.height = '50vh';
    }
  });

  anime({
    targets: '.title',
    translateY: ['25vh', '0'],
    color: '#000',
    scale: [0.8, 1],
    duration: 2000
  });

  anime({
    targets: '.content',
    translateY: ['50vh', 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutSine'
  });
}

export default splash;