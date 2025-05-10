// import React, { useEffect, useState } from "react";
import { CarouselDisplay } from "./CarouselDisplay";

export default function Carousel() {

  const imageUrls: string[] = [
    "../../src/images/image1.jpg",
    "../../src/images/image2.jpg",
    "../../src/images/image3.jpg",
    "../../src/images/image4.jpg",
    "../../src/images/image5.jpg",
   ];

  console.log(imageUrls);
  return(
      <CarouselDisplay images={imageUrls} />
  )

}