import React, { useRef } from "react";

const TouchDraggable = ({ children }) => {
  const dragTimer = useRef(null);
  const isDragging = useRef(false);
  const itemRef = useRef(null);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];

    dragTimer.current = setTimeout(() => {
      isDragging.current = true;

      const dragStartEvent = new CustomEvent("dragstart", {
        bubbles: true,
        detail: {
          x: touch.clientX,
          y: touch.clientY,
        },
      });
      itemRef.current.dispatchEvent(dragStartEvent);
      itemRef.current.classList.add("dragging"); // Optional: style it
    }, 500); // Long press time
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;

    const touch = e.touches[0];
    const dragMoveEvent = new CustomEvent("dragmove", {
      bubbles: true,
      detail: {
        x: touch.clientX,
        y: touch.clientY,
      },
    });
    itemRef.current.dispatchEvent(dragMoveEvent);
  };

  const handleTouchEnd = () => {
    clearTimeout(dragTimer.current);

    if (isDragging.current) {
      const dropEvent = new CustomEvent("drop", {
        bubbles: true,
        detail: {},
      });
      itemRef.current.dispatchEvent(dropEvent);
      itemRef.current.classList.remove("dragging");
    }

    isDragging.current = false;
  };

  return (
    <div
      ref={itemRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        touchAction: "none",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
};

export default TouchDraggable;
