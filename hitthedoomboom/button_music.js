// Get all drum pads
const pads = document.querySelectorAll('.drum-pad');

// Function to play sound
function playSound(soundId) {
  const audio = document.getElementById(soundId);
  if (!audio) {
    console.error(`Audio element with id "${soundId}" not found`);
    return;
  }
  
  // Reset audio to beginning and play
  audio.currentTime = 0;
  
  // Handle promise for browsers that require user interaction
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('Audio play failed:', error);
      // You could show a message to the user here if needed
    });
  }
}

// Add click event listeners to drum pads
pads.forEach(pad => {
  pad.addEventListener('click', () => {
    const soundId = pad.dataset.sound;
    playSound(soundId);
    
    // Add visual feedback
    pad.classList.add('playing');
    setTimeout(() => pad.classList.remove('playing'), 150);
  });
});

// Keyboard event handling (keys 1-8)
window.addEventListener('keydown', (e) => {
  // Prevent repeat keystrokes
  if (e.repeat) return;
  
  const keyMap = {
    'Digit1': 'audio/tom1.wav',
    'Digit2': 'audio/tom2.wav', 
    'Digit3': 'audio/tom3.wav',
    'Digit4': 'audio/tom4.wav',
    'Digit5': 'audio/tom5.wav',
    'Digit6': 'audio/tom6.wav',
    'Digit7': 'audio/tom7.wav',
    'Digit8': 'audio/tom8.wav',
  };
  
  if (keyMap[e.code]) {
    const soundId = keyMap[e.code];
    playSound(soundId);
    
    // Animate the corresponding pad
    const pad = document.querySelector(`.drum-pad[data-sound="${soundId}"]`);
    if (pad) {
      pad.classList.add('playing');
      setTimeout(() => pad.classList.remove('playing'), 150);
    }
  }
});

// "Hit the Drums" button - plays all drums in sequence
document.getElementById('hit-the-button').addEventListener('click', () => {
  let delay = 0;
  pads.forEach(pad => {
    setTimeout(() => {
      const soundId = pad.dataset.sound;
      playSound(soundId);
      
      // Add visual feedback
      pad.classList.add('playing');
      setTimeout(() => pad.classList.remove('playing'), 150);
    }, delay);
    delay += 160; // 160ms between each drum hit
  });
});

// Initialize audio context on first user interaction (for mobile browsers)
let audioInitialized = false;
function initializeAudio() {
  if (!audioInitialized) {
    // Try to play and immediately pause each audio to initialize
    document.querySelectorAll('audio').forEach(audio => {
      audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
      }).catch(() => {
        // Silently handle initialization errors
      });
    });
    audioInitialized = true;
  }
}

// Initialize audio on first click anywhere
document.addEventListener('click', initializeAudio, { once: true });