import { useEffect, useState, useRef, useCallback } from "react"; // Import useCallback
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "../../components/slider/slider-data";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  const intervalTime = 5000; // Time between slides in milliseconds
  const slideInterval = useRef(null); // Use useRef for the interval

  // Use useCallback to memoize the nextSlide function
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slideLength - 1 ? 0 : prev + 1));
  }, [slideLength]);

  // Use useCallback to memoize the prevSlide function
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slideLength - 1 : prev - 1));
  }, [slideLength]);

  useEffect(() => {
    setCurrentSlide(0); // Set the initial slide to the first one
  }, []);

  useEffect(() => {
    const auto = () => {
      slideInterval.current = setInterval(nextSlide, intervalTime);
    };

    if (autoScroll) {
      auto();
    }

    return () => clearInterval(slideInterval.current); // Clear the interval on component unmount
  }, [autoScroll, nextSlide]); // Include nextSlide in the dependency array

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt={heading} />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
