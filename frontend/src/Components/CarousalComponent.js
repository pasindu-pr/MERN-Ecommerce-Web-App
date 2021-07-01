import React from "react";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import carouselImages from "../carouselImages";
import "pure-react-carousel/dist/react-carousel.es.css";
import styled from "styled-components";

const CarousalComponent = () => {
  return (
    <>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={30}
        totalSlides={3}
        isPlaying={true}
      >
        <Slider>
          {carouselImages.map((image, index) => (
            <Slide key={index}>
              <Image
                className="slider-cont"
                src={image.src}
                className="carousel-image"
              />
            </Slide>
          ))}
        </Slider>

        <style jsx="true">
          {`
            .carousel-image {
              object-fit: cover;
            }
          `}
        </style>
      </CarouselProvider>
    </>
  );
};

export default CarousalComponent;
