import classes from "./ImgBox.module.css";
import { TbDragDrop } from "react-icons/tb";

export default function ImgBox({
  index,
  image,
  handleDrop,
  handleDragOver,
  handleDragStart,
  isUpperHalf,
  isLowerHalf,
}) {
  return (
    <div
      key={image.id}
      onDrop={(e) => handleDrop(e, index)}
      onDragOver={handleDragOver}
      draggable={false}
      className={`${classes.container} ${
        isUpperHalf ? classes.upperHalf : ""
      } ${isLowerHalf ? classes.lowerHalf : ""}`}
    >
      <div className={classes.imgContainer}>
        <div
          id="Handler"
          key={image.id}
          onDragStart={(e) => handleDragStart(e, index)}
          draggable
          className={classes.handler}
        >
          <TbDragDrop />
        </div>
        <img
          className={classes.img}
          src={`/assets/${image.src}`}
          alt={`Image ${index + 1}`}
          draggable={false}
        />
      </div>
    </div>
  );
}
