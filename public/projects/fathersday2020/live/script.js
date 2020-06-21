const club = document.getElementById('club');
const ball = document.getElementById('ball');

async function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

document.addEventListener('mousemove', (e) => {
  const x = e.clientX - 256;
  const y = e.clientY - 256;

  club.style.left = x + 'px';
  club.style.top = y + 'px';
});

let i = 10;

function one() {
  i -= 1;
  const direction = Math.random() < 0.5;
  anime.set('#ball', {
    top: `${ direction ? '110' : '-10' }vh`,
    left: `${Math.random() * 100}vw`
  });
  anime({
    targets: '#ball',
    top: `${ direction ? '-10' : '110' }vh`,
    left: `${Math.random() * 100}vw`,
    easing: 'easeOutQuad',
    duration: 400
  });
}

async function two() {
  anime.set('#ball', {
    top: '0',
    left: '50vw',
    scale: 1,
  });
  anime({
    targets: '#ball',
    top: 'calc(40vh + 15px)',
    left: 'calc(50vw + 22px)',
    scale: 0.5,
    easing: 'easeOutQuad',
    duration: 600
  });
  
  await wait(500);
  anime({
    targets: '#ball',
    opacity: 0,
    easing: 'easeOutQuad',
    duration: 200
  });

  const confettiSettings = { target: 'confetti' };
  const confetti = new ConfettiGenerator(confettiSettings);

  await wait(200);
  anime('#text', {
    left: '-100vw',
    scale: 1,
    opacity: 0
  });
  anime({
    targets: '#text',
    left: '0',
    opacity: 1,
    easing: 'easeInOutSine',
    duration: 1000
  });

  await wait(2000);
  confetti.render();
  anime('#confettiContainer', {
    opacity: 0
  });
  anime({
    targets: '#confettiContainer',
    opacity: 1,
    easing: 'easeInOutSine',
    duration: 2000
  });
}

async function hit() {
  anime({
    targets: '#ball',
    top: 0,
    left: '100vw',
    easing: 'easeOutQuad',
    duration: 300,
    delay: 800
  });

  await wait(1100);

  async function repeat() {
    if (i > 0) {
      one();
      const extra = Math.floor(Math.random() * 200);
      await wait(400 + extra);
      repeat();
    } else {
      two();
    }
  }
  repeat();
}

document.addEventListener('click', (e) => {
  const positionInfo = ball.getBoundingClientRect();
  const left = positionInfo.left;
  const top = positionInfo.top;

  const x = e.clientX - left;
  const y = e.clientY - top;

  if (x > -20 && x < 60 && y > -129 && y < -80) {
    hit();
  }

  anime.set('#club', {
    rotate: 10
  })
  anime({
    targets: '#club',
    rotate: [10, 40, -80],
    scale: [0.5, 0.5],
    easing: 'easeInOutSine',
    duration: 1000
  });
  setTimeout(() => {
    anime({
      targets: '#club',
      rotate: [-80, 10],
      scale: [0.5, 0.5],
      easing: 'easeOutQuad',
      duration: 500
    });
  }, 1000);
});