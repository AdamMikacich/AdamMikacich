import splash from './splash.js';
import parallax from './parallax.js';
import stars from './stars.js';

document.addEventListener('DOMContentLoaded', async function() {
  stars();
  parallax();
  await splash();
});