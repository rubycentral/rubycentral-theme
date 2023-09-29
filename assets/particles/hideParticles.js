const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function displayParticlesBasedOnMotionPreferences() {
  if (reducedMotionMediaQuery.matches) {
    particles.style.display = "none";
  } else {
    particles.style.display = "block";
  }
}

displayParticlesBasedOnMotionPreferences();           // run on page ready
reducedMotionMediaQuery.addEventListener(             // run on change
  'change', displayParticlesBasedOnMotionPreferences
);
