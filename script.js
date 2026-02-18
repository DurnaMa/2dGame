function toggleFullscreen() {
  let container = document.getElementById('canvas');
  if (!document.fullscreenElement) {
    openFullscreen(container);
  } else {
    closeFullscreen();
  }
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

// Update SVG icon based on fullscreen state
document.addEventListener('fullscreenchange', () => {
  const icon = document.getElementById('fullscreenIcon');
  if (document.fullscreenElement) {
    icon.src = 'assets/icon/fullscreen-exit.svg';
  } else {
    icon.src = 'assets/icon/fullscreen-enter.svg';
  }
});
