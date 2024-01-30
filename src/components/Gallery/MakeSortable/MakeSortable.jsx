import React, { useEffect, useState } from "react";

export default function MakeSortable({ children, items, onSort }) {
  const [isUpperHalf, setIsUpperHalf] = useState(false);
  const [isLowerHalf, setIsLowerHalf] = useState(false);
  const [dragIndex, setDragIndex] = useState();

  const handleDragStart = (e) => {
    let index = Number(e.currentTarget.getAttribute("data-index"));
    e.dataTransfer.setData("index", index);
    setDragIndex(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    let index = Number(e.currentTarget.getAttribute("data-index"));
    const mouseY = e.clientY;

    const imgContainer = e.currentTarget;
    const containerTop = imgContainer.offsetTop;
    const containerHeight = imgContainer.clientHeight;

    let upperHalf = mouseY < containerTop + containerHeight / 2;
    let lowerHalf = mouseY > containerTop + containerHeight / 2;

    upperHalf && e.currentTarget.classList.add("upperHalf");
    lowerHalf && e.currentTarget.classList.add("lowerHalf");

    lowerHalf && e.currentTarget.classList.remove("upperHalf");
    upperHalf && e.currentTarget.classList.remove("lowerHalf");

    console.log("upperHalf", upperHalf);
    console.log("lowerHalf", lowerHalf);
  };

  const handleDrop = (e) => {
    let index = Number(e.currentTarget.getAttribute("data-index"));
    e.currentTarget.classList.remove("upper-half");
    e.preventDefault();

    const sourceIndex = e.dataTransfer.getData("index");
    const newImages = [...items];
    const [draggedImage] = newImages.splice(sourceIndex, 1);
    newImages.splice(index, 0, draggedImage);
    onSort(newImages);
  };

  useEffect(() => {
    const wrapper = document.getElementById("wrapper");

    [...wrapper.children].forEach((elem, i) => {
      elem.setAttribute("data-index", i);
      elem.addEventListener("drag", handleDragStart);
      elem.addEventListener("dragover", handleDragOver);
      elem.addEventListener("drop", handleDrop);
    });

    return () => {
      [...wrapper.children].forEach((elem, i) => {
        elem.removeAttribute("data-index");
        elem.removeEventListener("drag", handleDragStart);
        elem.removeEventListener("dragover", handleDragOver);
        elem.removeEventListener("drop", handleDrop);
      });
    };
  }, [children, dragIndex]);

  // useEffect(
  //   (e) => {
  //     if (isUpperHalf) {
  //       e.currentTarget.classList.add("upperHalf");
  //     } else if (isLowerHalf) {
  //       e.currentTarget.classList.add("lowerHalf");
  //     }
  //   },
  //   [isUpperHalf, isLowerHalf]
  // );

  return <div id="wrapper">{children}</div>;
}
