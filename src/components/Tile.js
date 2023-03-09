

import { useState, useRef, useEffect } from "react";
import "../Index.css";

function Tile(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(props.position);
  const tileRef = useRef(null);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      updatePosition();
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    const tile = tileRef.current;
    const tileRect = tile.getBoundingClientRect();
    setPosition({
      x: event.clientX - tileRect.width / 2,
      y: event.clientY - tileRect.height / 2,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleEditClick = () => {
    const newTitle = prompt("Enter new title:", props.title);
    if (newTitle !== null && newTitle !== props.title) {
      props.onUpdate(props.id, position, newTitle);
      props.setTitle(newTitle);
  }
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this tile?")) {
      props.onDelete(props.id);
    }
  };

  const updatePosition = () => {
    props.onUpdate(props.id, position);
  };

  return (
    <div
      ref={tileRef}
      className="tile"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <div className="tile-header">
        <div className="tile-title">{props.title}</div>
        <div className="tile-actions">
          <button className="tile-action" onClick={handleEditClick}>
            EDIT
          </button>
          <button className="tile-action" onClick={handleDeleteClick}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tile;
