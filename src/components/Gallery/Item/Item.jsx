import { useState } from "react";
import "./Item.css";
import { TbDragDrop } from "react-icons/tb";

export default function Item({ image }) {
  const [drag, setDrag] = useState(false);

  return (
    <div draggable={false} className={"container"}>
      <div draggable={drag ? true : false} className="imgContainer">
        <div
          id="Handler"
          className="handler"
          onMouseDown={() => setDrag(true)}
          onMouseUp={() => setDrag(false)}
        >
          <TbDragDrop />
        </div>
        <img className="img" src={`/assets/${image.src}`} draggable={false} />
      </div>
    </div>
  );
}
