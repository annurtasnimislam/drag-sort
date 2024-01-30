import "./Item.css";
import { TbDragDrop } from "react-icons/tb";

export default function Item({ image }) {
  return (
    <div
      id="wrapper"
      draggable={false}
      //   className={`${classes.container} ${
      //     index === dragOver
      //       ? isUpperHalf
      //         ? classes.upperHalf
      //         : isLowerHalf
      //         ? classes.lowerHalf
      //         : ""
      //       : ""
      //   } `}
      className={"container"}
    >
      <div draggable={true} className="imgContainer">
        <div
          id="Handler"
          className="handler"
          //   onMouseDown={() => setDrag(true)}
        >
          <TbDragDrop />
        </div>
        <img className="img" src={`/assets/${image.src}`} draggable={false} />
      </div>
    </div>
  );
}
