
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
    const knobLeftPosition = splitDimensions.width - (knobDimensions.width / 2);
    knobElement.style.top = `${ knobTopPosition }px`;
    knobElement.style.left = `${ knobLeftPosition }px`;
    resizableElement.style.width = `${ splitDimensions.width }px`;
  }

  function resizeSplit(deltaX) {
    const splitDimensions = splitElement.getBoundingClientRect();
    const resizableDimensions = resizableElement.getBoundingClientRect();
    fixedElement.style.width = `${ splitDimensions.width }px`;
    resizableElement.style.width = `${ resizableDimensions.width + deltaX }px`;
  }

  function onSplitMouseMove(ev) {
    if (!lastMouseX) {
      lastMouseX = ev.clientX;
      return;
    }
    const knobDimensions = knobElement.getBoundingClientRect();
    const splitDimensions = splitElement.getBoundingClientRect();
    const currentKnobX = knobDimensions.left - splitDimensions.left;
    const deltaX = ev.clientX - lastMouseX;
    lastMouseX = lastMouseX + deltaX;
    knobElement.style.left = `${ currentKnobX + deltaX }px`;
    resizeSplit(deltaX);
  }

  function onKnobMouseDown() {
    splitElement.addEventListener('mousemove', onSplitMouseMove);
  }

  function onSplitMouseUp() {
    lastMouseX = null;
    splitElement.removeEventListener('mousemove', onSplitMouseMove);
  }

  function onDocumentScroll() {
    knobElement.style.top = `${ window.pageYOffset + (window.innerHeight / 2)}px`;
  }

  function attachEventListeners() {
    knobElement.addEventListener('mousedown', onKnobMouseDown);
    splitElement.addEventListener('mouseup', onSplitMouseUp);
    document.addEventListener('scroll', onDocumentScroll);
  }

  // start
  setInitialDimensions();
  attachEventListeners();
});
