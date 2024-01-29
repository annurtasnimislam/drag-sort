export default function MakeSortable() {
  return (
    <div className={classes.wrapper}>
      {images.map((image, index) => (
        <div
          key={image.id}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          draggable={false}
          className={`${classes.container} ${
            index === dragOver
              ? isUpperHalf
                ? classes.upperHalf
                : isLowerHalf
                ? classes.lowerHalf
                : ""
              : ""
          } `}
        >
          <div
            onDragStart={(e) => handleDragStart(e, index)}
            draggable={drag ? true : false}
            className={classes.imgContainer}
          >
            <div
              id="Handler"
              key={image.id}
              className={classes.handler}
              onMouseDown={() => setDrag(true)}
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
        // <ImgBox
        //   key={image.id}
        //   index={index}
        //   image={image}
        //   handleDrop={handleDrop}
        //   handleDragOver={handleDragOver}
        //   handleDragStart={handleDragStart}
        //   isUpperHalf={isUpperHalf}
        //   isLowerHalf={isLowerHalf}
        // />
      ))}
    </div>
  );
}
