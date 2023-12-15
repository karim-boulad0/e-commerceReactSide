import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    // Smooth scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    // Add a scroll event listener to track the user's scroll position
    const handleScroll = () => {
      // Show the button when the user scrolls down 100 pixels
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      variant="primary"
      className={`scroll-to-top-btn  ${isVisible ? "visible" : "d-none"}`}
      onClick={scrollToTop}
    >
      Scroll to Top
    </Button>
  );
};

export default ScrollToTopButton;
