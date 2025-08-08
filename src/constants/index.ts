export const slick_settings = {
  focusOnSelect: true,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 500,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1024, // dưới 1024px
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768, // dưới 768px
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600, // dưới 600px
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export const slick_settings_banner = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};
