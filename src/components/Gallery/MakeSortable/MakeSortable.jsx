import React, { useEffect, useState } from "react";

export default function MakeSortable({ children, items, onSort }) {
  const [isLowerHalf, setIsLowerHalf] = useState(false);
  const [dragIndex, setDragIndex] = useState();

  const handleDragStart = (e) => {
    let index = Number(e.currentTarget.getAttribute("data-index"));
    e.dataTransfer.setData("index", index);
    setDragIndex(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();

    const mouseY = e.clientY;

    const imgContainer = e.currentTarget;
    const containerTop = imgContainer.offsetTop;
    const containerHeight = imgContainer.clientHeight;

    let upperHalf = mouseY < containerTop + containerHeight / 2;
    let lowerHalf = mouseY > containerTop + containerHeight / 2;

    [...document.querySelectorAll(".drag-over")].forEach((elem) =>
      elem.classList.remove("upperHalf", "lowerHalf", "drag-over")
    );

    if (upperHalf) {
      e.currentTarget.classList.add("upperHalf", "drag-over");
      setIsLowerHalf(false);
    } else if (lowerHalf) {
      e.currentTarget.classList.add("lowerHalf", "drag-over");
      setIsLowerHalf(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let index = Number(e.currentTarget.getAttribute("data-index"));

    let targetIndex;
    if (isLowerHalf) {
      targetIndex = index + 1;
    } else {
      targetIndex = index;
    }

    const newImages = [...items];
    const [draggedImage] = newImages.splice(dragIndex, 1);
    newImages.splice(targetIndex, 0, draggedImage);
    onSort(newImages);

    [...document.querySelectorAll(".drag-over")].forEach((elem) =>
      elem.classList.remove("upperHalf", "lowerHalf", "drag-over")
    );
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
  }, [children, dragIndex, isLowerHalf]);

  return <div id="wrapper">{children}</div>;
}
