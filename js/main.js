import { GameEngine } from './GameEngine.js';

window.addEventListener('DOMContentLoaded', () => {
  const engine = new GameEngine('game-canvas');
  engine.start();

  // Fullscreen Event Listener
  window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyF') {
      toggleFullscreen();
    }
  });
});

function toggleFullscreen() {
  const container = document.getElementById('game-container');
  
  if (!document.fullscreenElement) {
    // Enter fullscreen
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) { /* Safari */
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) { /* IE11 */
      container.msRequestFullscreen();
    }
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
}