import React, { useEffect, useRef, useState } from 'react';
import './infinitecard.css';

const InfiniteCardSlider = () => {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  let timeoutId;

  useEffect(() => {
    const carousel = carouselRef.current;
    const wrapper = wrapperRef.current;
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = wrapper.querySelectorAll("i");
    const carouselChildrens = [...carousel.children];

    let isDragging = false;
    let startX;
    let startScrollLeft;

    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

        carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    
    arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
      });
    });

    const dragStart = (e) => {
      setIsDragging(true);
      carousel.classList.add("dragging");
      setStartX(e.pageX);
      setStartScrollLeft(carousel.scrollLeft);
    };

    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
      setIsDragging(false);
      carousel.classList.remove("dragging");
    };

    const infiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
      } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }

      clearTimeout(timeoutId);
      if (!wrapper.matches(":hover")) {
        autoPlay();
      }
    };

    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
    };
    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    return () => {
      carousel.removeEventListener("mousedown", dragStart);
      carousel.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
      carousel.removeEventListener("scroll", infiniteScroll);
      wrapper.removeEventListener("mouseenter", () => clearTimeout(timeoutId));
      wrapper.removeEventListener("mouseleave", autoPlay);
    };
  }, [isAutoPlay]);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <i id="left" className="fa-solid fa-angle-left"></i>
      <ul className="carousel" ref={carouselRef}>
        <li className="card">
          <h2 className='H2'>Reliable Pickups:</h2>
          <span className='span'>Ensuring prompt and reliable pickups is crucial</span>
        </li>
        <li className="card">
          <h2 className='H2'>24/7 Customer Support:</h2>
          <span className='span'>Offering round-the-clock customer support</span>
        </li>
        <li className="card">
          <h2 className='H2'>Safety and Security:</h2>
          <span className='span'>Prioritizing passenger safety and security is a must. </span>
        </li>
        <li className="card">
          <h2 className='H2'>Complaint Resolution:</h2>
          <span className='span'> Promptly addressing and resolving any complaints </span>
        </li>
        <li className="card">
          <h2 className='H2'>Personalized Services:</h2>
          <span className='span'>Going the extra mile to offer personalized services</span>
        </li>
        <li className="card">
          <h2 className='H2'>Clear Communicate:</h2>
          <span className='span'>Effective communication with customers is vital.</span>
        </li>
      </ul>
      <i id="right" className="fa-solid fa-angle-right"></i>
    </div>
  );
};

export default InfiniteCardSlider;
