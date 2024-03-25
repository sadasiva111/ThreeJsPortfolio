import React, { useEffect, useRef } from "react";
import EventEmitter from "wolfy87-eventemitter";
import { Html } from "@react-three/drei";

const Scroll = () => {
  const scrollRef = useRef(null);
  const buttonRef = useRef(null);
  const fillCircleRef = useRef(null);
  const eventEmitter = useRef(new EventEmitter());

  useEffect(() => {
    const buttonElement = buttonRef.current;
    const fillCircleElement = fillCircleRef.current;

    if (buttonElement && fillCircleElement) {
      const handleClick = () => {
        eventEmitter.current.emitEvent("click");
      };

      const handleMouseMove = (e) => {
        const bound = buttonElement.getBoundingClientRect();
        const x = e.clientX - bound.left;
        const y = e.clientY - bound.top;
        fillCircleElement.style.left = `${x}px`;
        fillCircleElement.style.top = `${y}px`;
      };

      buttonElement.addEventListener("click", handleClick);
      buttonElement.addEventListener("mousemove", handleMouseMove);

      return () => {
        buttonElement.removeEventListener("click", handleClick);
        buttonElement.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  const switchVisible = (visible) => {
    if (scrollRef.current) {
      scrollRef.current.setAttribute(
        "data-visible",
        visible ? "true" : "false"
      );
    }
  };

  return (
    <Html>
      <div ref={scrollRef} className="scroll">
        <button ref={buttonRef} className="scroll-btn">
          <div ref={fillCircleRef} className="scroll-fillCircle"></div>
        </button>
      </div>
    </Html>
  );
};

export default Scroll;
