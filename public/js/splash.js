import utils from './utils.js';

async function splash() {
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