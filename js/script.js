$(document).ready(function() {
  const $slider = $('.news-block__slider');
  const $currentPageElement = $('.news-block__current-page');
  const $pageAmountElement = $('.news-block__page-amount');
  const $prevButton = $('.prev');
  const $nextButton = $('.next');

  $slider.on('init', function(event, slick, currentSlide) {
    if (!slick.$dots) {
      return;
    }
    $currentPageElement.text(1);
    $prevButton.addClass('disabled');
    $pageAmountElement.text(slick.$dots[0].children.length);
  });

  $slider.slick({
    dots: true,
    infinite: false,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      }
    ]
  });

  $slider.on('reInit afterChange', function(event, slick, currentSlide) {
    const dots = slick.$dots[0].children.length;
    const width = slick.listWidth;
    const slideAmount = width < 768 ? 1 : width < 1024 ? 2 : 3;

    const currentPage = currentSlide / slideAmount + 1;

    $currentPageElement.text(currentPage);
    $pageAmountElement.text(dots);

    currentPage === 1
      ? $prevButton.addClass('disabled')
      : $prevButton.removeClass('disabled');
    currentPage === dots
      ? $nextButton.addClass('disabled')
      : $nextButton.removeClass('disabled');
  });
});
