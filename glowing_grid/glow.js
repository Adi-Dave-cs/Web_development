function trackMouse(event) {
    const cursorTrail = document.createElement('div');
    cursorTrail.classList.add('cursor-trail');
    cursorTrail.style.left = event.offsetX + 'px';
    cursorTrail.style.top = event.offsetY + 'px';
    event.target.appendChild(cursorTrail);
    
    // Remove the trail after a short delay (e.g., 1 second)
    setTimeout(() => {
      cursorTrail.remove();
    }, 2500);
  }