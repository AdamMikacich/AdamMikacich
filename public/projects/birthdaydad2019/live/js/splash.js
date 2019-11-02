import utils from '/js/utils.js';

async function splash() {
  await utils.pause(500);

  anime({
    targets: '#happy, #birthday',
    translateX: ['-100vw', '0'],
    color: '#305be7',
    duration: 2000,
    delay: anime.stagger(100),
    easing: 'easeOutElastic'
  });

  await utils.pause(1000);

  anime({
    targets: 'p',
    translateX: ['-100vw', '0'],
    opacity: 1,
    duration: 2000,
    easing: 'easeOutElastic'
  });

  await utils.pause(1000);

  anime({
    targets: '#love, #adam',
    translateX: ['-100vw', '0'],
    color: '#305be7',
    duration: 2000,
    delay: anime.stagger(100),
    easing: 'easeOutElastic'
  });

  await utils.pause(2000);
  return;
}

export default splash;