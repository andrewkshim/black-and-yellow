$(document).ready(function() {
  const splitElement = document.getElementById('split');
  const resizableElement = document.getElementById('resizable');
  const fixedElement = document.getElementById('fixed');
  const knobElement = document.getElementById('knob');

  let lastMouseX;

  function setInitialDimensions() {
    const knobDimensions = knobElement.getBoundingClientRect();
    const splitDimensions = splitElement.getBoundingClientRect();
    const knobTopPosition = (splitDimensions.height / 2) - (knobDimensions.height / 2);
    const knobLeftPosition = (splitDimensions.width / 2) - (knobDimensions.width / 2);
    knobElement.style.top = `${ knobTopPosition }px`;
    knobElement.style.left = `${ knobLeftPosition }px`;
    fixedElement.style.width = `${ splitDimensions.width }px`;
    resizableElement.style.width = `${ splitDimensions.width / 2 }px`;
  }

  function onSplitMouseMove(ev) {
    if (!lastMouseX) {
      lastMouseX = ev.clientX;
      return;
    }

    const splitDimensions = splitElement.getBoundingClientRect();
    const knobDimensions = knobElement.getBoundingClientRect();
    const resizableDimensions = resizableElement.getBoundingClientRect();

    const leftBoundary = splitDimensions.left;
    const rightBoundary = splitDimensions.left + splitDimensions.width;

    const currentKnobX = knobDimensions.left - splitDimensions.left;
    const deltaX = ev.clientX - lastMouseX;
    const nextKnobX = currentKnobX + deltaX;
    const nextKnobCenter = knobDimensions.left + (knobDimensions.width / 2);
    lastMouseX = lastMouseX + deltaX;
    fixedElement.style.width = `${ splitDimensions.width }px`;

    if (nextKnobCenter < leftBoundary) {
      knobElement.style.left = `${ -(knobDimensions.width / 2) }px`;
      resizableElement.style.width = `0px`;
    } else if (nextKnobCenter > rightBoundary) {
      knobElement.style.left = `${ splitDimensions.width - (knobDimensions.width / 2) }px`;
      resizableElement.style.width = `${ splitDimensions.width }px`;
    } else {
      resizableElement.style.width = `${ resizableDimensions.width + deltaX }px`;
      knobElement.style.left = `${ nextKnobX }px`;
    }
  }

  function onKnobMouseDown() {
    splitElement.addEventListener('mousemove', onSplitMouseMove);
  }

  function onKnobMouseUp() {
    splitElement.removeEventListener('mousemove', onSplitMouseMove);
  }

  function onKnobMouseEnter() {
    knobElement.addEventListener('mousedown', onKnobMouseDown);
    knobElement.addEventListener('mouseup', onKnobMouseUp);
  }

  function onKnobMouseLeave() {
    lastMouseX = null;
    knobElement.removeEventListener('mousedown', onKnobMouseDown);
    knobElement.removeEventListener('mouseup', onKnobMouseUp);
    splitElement.removeEventListener('mousemove', onSplitMouseMove);
  }

  function onSplitMouseUp() {
    lastMouseX = null;
    splitElement.removeEventListener('mousemove', onSplitMouseMove);
  }

  function onDocumentScroll() {
    knobElement.style.top = `${ window.pageYOffset + (window.innerHeight / 2)}px`;
  }

  function attachEventListeners() {
    knobElement.addEventListener('mouseenter', onKnobMouseEnter);
    knobElement.addEventListener('mouseleave', onKnobMouseLeave);
    splitElement.addEventListener('mouseup', onSplitMouseUp);
  }

  let animationFrame;

  function startKnobPositionAdjustment() {
    animationFrame = requestAnimationFrame(function() {
      knobElement.style.top = `${ window.pageYOffset + (window.innerHeight / 2)}px`;
      startKnobPositionAdjustment();
    });
  }

  // this function not used right now
  function stopKnobPositionAdjustment() {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  // start
  setInitialDimensions();
  attachEventListeners();
  startKnobPositionAdjustment();
});
