$(document).ready(function() {

  const mattyBioElement = $('#matty-bio');
  const shimmyBioElement = $('#shimmy-bio');

  function adjustImages(bioElement, currentImageIndex) {
    const imageOne = bioElement.find('.bio-image-1');
    const imageTwo = bioElement.find('.bio-image-2');
    const imageThree = bioElement.find('.bio-image-3');

    if (currentImageIndex === 0) {
      imageOne.css('left', '0%');
      imageTwo.css('left', '100%');
      imageThree.css('left', '200%');
    } else if (currentImageIndex === 1) {
      imageOne.css('left', '-100%');
      imageTwo.css('left', '0%');
      imageThree.css('left', '100%');
    } else if (currentImageIndex === 2) {
      imageOne.css('left', '-200%');
      imageTwo.css('left', '-100%');
      imageThree.css('left', '0%');
    }
  }

  function attachCarouselEventHandlers(bioElement) {
    const leftBtn = bioElement.find('.carousel-btn-left');
    const rightBtn = bioElement.find('.carousel-btn-right');
    let currentImageIndex = 0;
    leftBtn.on('click', function() {
      if (currentImageIndex === 0) {
        currentImageIndex = 2;
      } else if (currentImageIndex === 1) {
        currentImageIndex = 0;
      } else if (currentImageIndex === 2) {
        currentImageIndex = 1;
      }
      adjustImages(bioElement, currentImageIndex);
    });
    rightBtn.on('click', function() {
      if (currentImageIndex === 0) {
        currentImageIndex = 1;
      } else if (currentImageIndex === 1) {
        currentImageIndex = 2;
      } else if (currentImageIndex === 2) {
        currentImageIndex = 0;
      }
      adjustImages(bioElement, currentImageIndex);
    });
  }

  attachCarouselEventHandlers(mattyBioElement);
  attachCarouselEventHandlers(shimmyBioElement);
});
