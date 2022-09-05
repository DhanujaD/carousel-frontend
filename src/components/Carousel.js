import React, { useEffect, useState } from 'react';
import { getSlides } from '../api/carousel';

const Carousel = ({ slides = 5, infinite }) => {
  const [carouselData, setCarouselData] = useState(null);
  const [slideIndex, setSlideIndex] = useState(1);
  let timeOut;

  useEffect(() => {
    getSlides(slides)
      .then((response) => {
        if (response.data.isSuccess) {
          setCarouselData(
            response.data.slides.map((slide) => {
              return {
                ...slide,
                isVisible: false,
              };
            })
          );
        } else {
          console.error('GET carousel failed: ', response.data.message);
        }
      })
      .catch((error) => {
        console.error('GET carousel failed', error);
      });
  }, [slides]);

  const showSlides = () => {
    if (carouselData) {
      if (slideIndex > carouselData.length) {
        if (infinite) {
          setSlideIndex(1);
        } else {
          setSlideIndex(carouselData.length);
        }
      }

      if (slideIndex < 1) {
        setSlideIndex(carouselData.length);
      }

      for (let i = 0; i < carouselData.length; i++) {
        carouselData[i].isVisible = false;
      }

      const slide = carouselData[slideIndex - 1];
      if (slide) {
        slide.isVisible = true;
      }

      timeOut = setTimeout(() => {
        setSlideIndex(slideIndex + 1);
      }, 5000);
    }
  };

  showSlides();

  const changeSlide = (count) => {
    clearTimeout(timeOut);
    setSlideIndex(slideIndex + count);
  };

  return (
    <>
      <div className="slideshow-container">
        {carouselData &&
          carouselData.map((slide, index) => {
            const style = { display: slide.isVisible ? 'block' : 'none' };
            return (
              <div key={index} className="mySlides fade" style={style}>
                <img src={slide.image} alt="test" />
                <div className="title">{slide.title}</div>
                <div className="subTitle">{slide.subTitle}</div>
              </div>
            );
          })}

        <div className="button-container">
          <button className="prev" onClick={() => changeSlide(-1)}>
            ❮
          </button>
          <button className="next" onClick={() => changeSlide(1)}>
            ❯
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
