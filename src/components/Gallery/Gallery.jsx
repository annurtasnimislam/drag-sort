import classes from "./Gallery.module.css";
import React, { useState } from "react";
import { TbDragDrop } from "react-icons/tb";

export default function Gallery() {
  const [images, setImages] = useState([
    { id: 1, src: "image-1.webp" },
    { id: 2, src: "image-2.webp" },
    { id: 3, src: "image-3.webp" },
    { id: 4, src: "image-4.webp" },
    { id: 5, src: "image-5.webp" },
    { id: 6, src: "image-6.webp" },
    { id: 7, src: "image-7.webp" },
    { id: 8, src: "image-8.webp" },
  ]);

  // ***** Image Drag & Drop *****
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("index");
    const newImages = [...images];
    const [draggedImage] = newImages.splice(sourceIndex, 1);
    newImages.splice(targetIndex, 0, draggedImage);
    setImages(newImages);
  };

  return (
    <div>
      <p>{JSON.stringify(images)}</p>
      <div className={classes.wrapper}>
        {images.map((image, index) => (
          <div
            key={image.id}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            draggable={false}
            className={classes.imgContainer}
          >
            <div
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
        ))}
      </div>
    </div>
  );
}
