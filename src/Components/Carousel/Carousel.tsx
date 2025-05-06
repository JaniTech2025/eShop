// import React, { useEffect, useState } from "react";
import { CarouselDisplay } from "./CarouselDisplay";

export default function Carousel() {

    const imageUrls: string[] = [
        "https://www.w3schools.com/bootstrap5/la.jpg",
        "https://www.w3schools.com/bootstrap5/chicago.jpg",
        "https://www.w3schools.com/bootstrap5/ny.jpg",
        "https://www.w3schools.com/howto/img_nature_wide.jpg",
        "https://www.w3schools.com/howto/img_snow_wide.jpg"      ];


      return(
      <CarouselDisplay images={imageUrls} />
     )

}