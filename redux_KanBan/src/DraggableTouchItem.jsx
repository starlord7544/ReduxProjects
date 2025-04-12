import React, { useRef, useState, useEffect } from "react";

const DraggableTouchItem = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const itemRef = useRef(null);
    const dragTimer = useRef(null);

    // Touch start
    const handleTouchStart = (e) => {
        const touch = e.touches[0];

        dragTimer.current = setTimeout(() => {
            setIsDragging(true);
            setPosition({ x: touch.clientX, y: touch.clientY });

            // Simulate dragstart event
            const dragStartEvent = new CustomEvent("dragstart", {
                detail: { x: touch.clientX, y: touch.clientY },
            });
            itemRef.current.dispatchEvent(dragStartEvent);
        }, 200); // 500ms hold to trigger drag
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        setPosition({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = () => {
        clearTimeout(dragTimer.current);
        if (isDragging) {
            setIsDragging(false);

            // Simulate drop event
            const dropEvent = new CustomEvent("drop", {
                detail: position,
            });
            itemRef.current.dispatchEvent(dropEvent);
        }
    };

    useEffect(() => {
        const el = itemRef.current;

        const onDragStart = (e) => {
            console.log("Simulated dragStart at:", e.detail);
        };

        const onDrop = (e) => {
            console.log("Simulated drop at:", e.detail);
        };

        el.addEventListener("dragstart", onDragStart);
        el.addEventListener("drop", onDrop);

        return () => {
            el.removeEventListener("dragstart", onDragStart);
            el.removeEventListener("drop", onDrop);
        };
    }, []);

    return (
        <div
            ref={itemRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                width: 100,
                height: 100,
                backgroundColor: "lightblue",
                position: isDragging ? "absolute" : "relative",
                left: isDragging ? position.x - 50 : 0,
                top: isDragging ? position.y - 50 : 0,
                zIndex: isDragging ? 1000 : 1,
                touchAction: "none",
                userSelect: "none",
            }}
        >
            Touch & Hold Me
        </div>
    );
};

export default DraggableTouchItem;
