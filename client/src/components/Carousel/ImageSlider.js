import { useEffect, useState } from "react";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "contain",
  backgroundPosition: "center",
  'background-repeat': 'no-repeat',
  transitionDuration: '0.8s'
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 0,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 0,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};



const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
    'background-color': `${slides[currentIndex].backColor}`,
  };

  function dotStyle(index) {
    return {
      margin: "0 3px",
      cursor: "pointer",
      fontSize: "20px",
      color: currentIndex === index ? 'var(--Pink)' : 'var(--LightOrange)',
    }
  }

  useEffect(() => {
    while (true) {
      const timer = setTimeout(() => {
        setCurrentIndex(slides.length - 1 === currentIndex ? 0 : currentIndex + 1)
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div style={sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          <img src={require('../../assets/icons/ic-previou-white.png')} alt='left arrow' />
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          <img src={require('../../assets/icons/ic-next-white.png')} alt='right arrow' />
        </div>
      </div>
      <div style={slideStylesWidthBackground}></div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle(slideIndex)}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;