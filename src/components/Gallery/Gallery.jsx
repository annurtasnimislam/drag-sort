import classes from "./Gallery.module.css";
import React, { useState } from "react";
import Item from "./Item/Item";
import MakeSortable from "./MakeSortable/MakeSortable";

export default function Gallery() {
  const [items, setItems] = useState([
    { src: "image-1.webp" },
    { src: "image-2.webp" },
    { src: "image-3.webp" },
    { src: "image-4.webp" },
    { src: "image-5.webp" },
    { src: "image-6.webp" },
    { src: "image-7.webp" },
    { src: "image-8.webp" },
  ]);

  let itemComp = items.map((image, i) => <Item key={i} image={image} />);

  return (
    <div>
      <p className={classes.array}>{JSON.stringify(items)}</p>
      <div className={classes.wrapper}>
        <MakeSortable items={items} onSort={(array) => setItems(array)}>
          {itemComp}
        </MakeSortable>
      </div>
    </div>
  );
}
