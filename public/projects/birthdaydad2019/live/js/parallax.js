async function parallax() {
  const text = document.getElementById('text');
  document.addEventListener('mousemove', (event) => {
    const x = Math.floor(0.01 * Math.pow(((window.innerWidth / 2) - event.x), 1));
    const y = Math.floor(0.01 * Math.pow(((window.innerHeight / 2) - event.y), 1));
    text.style.transform = `translate(${x}px, ${y}px)`;
  })
}

export default parallax;