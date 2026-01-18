// Loading screen functionality
window.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  
  if (loadingScreen) {
    // Create progress bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'loading-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'loading-progress-bar';
    
    progressBarContainer.appendChild(progressBar);
    loadingScreen.appendChild(progressBarContainer);
    
    // Animate progress bar
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10 + 5; // Random increment for more natural feel
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      progressBar.style.width = progress + '%';
    }, 150);
    
    // Hide loading screen after simulated loading
    setTimeout(function() {
      loadingScreen.classList.add('hidden');
      
      // Remove loading elements after transition
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.parentNode.removeChild(loadingScreen);
        }
      }, 800);
    }, 3000); // Show loading screen for 3 seconds to allow progress animation
  }
});

// Cursor sparkle effects
document.addEventListener('DOMContentLoaded', function() {
  // Function to create sparkles
  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    // Random green shades
    const greenShades = ['#00c853', '#64dd17', '#00bfa5', '#1de9b6', '#00e676'];
    const randomColor = greenShades[Math.floor(Math.random() * greenShades.length)];
    sparkle.style.background = randomColor;

    // Random size
    const size = Math.random() * 6 + 4; // Between 4-10px
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    sparkle.style.left = `${x - size/2}px`;
    sparkle.style.top = `${y - size/2}px`;

    document.body.appendChild(sparkle);

    // Remove sparkle after animation completes
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }

  // Mouse move event (for desktop)
  document.addEventListener('mousemove', function(e) {
    if (Math.random() < 0.15) { // Reduce frequency of sparkles
      createSparkle(e.clientX, e.clientY);
    }
  });

  // Touch events (for mobile)
  document.addEventListener('touchmove', function(e) {
    if (Math.random() < 0.25) { // Slightly higher frequency for touch
      const touch = e.touches[0];
      createSparkle(touch.clientX, touch.clientY);
    }
  });

  // Touch start event for mobile
  document.addEventListener('touchstart', function(e) {
    // Create more sparkles on touch start
    const touch = e.touches[0];
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createSparkle(
          touch.clientX + (Math.random() - 0.5) * 30,
          touch.clientY + (Math.random() - 0.5) * 30
        );
      }, i * 20);
    }
  });

  // Click/tap event for both desktop and mobile
  document.addEventListener('click', function(e) {
    // Create more sparkles on click
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        createSparkle(
          e.clientX + (Math.random() - 0.5) * 40,
          e.clientY + (Math.random() - 0.5) * 40
        );
      }, i * 30);
    }
  });

  // Touch end event for mobile taps
  document.addEventListener('touchend', function(e) {
    if (e.touches.length === 0) { // Only when all fingers are lifted
      const touch = e.changedTouches[0];
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createSparkle(
            touch.clientX + (Math.random() - 0.5) * 40,
            touch.clientY + (Math.random() - 0.5) * 40
          );
        }, i * 30);
      }
    }
  });
});