import classes from './Home.module.scss';
import {CarouselDisplay} from "../../Components/Carousel/CarouselDisplay";
import FavouritedProducts from '../../Components/FavouritedProducts/FavouritedProducts';

export default function Home() {

  
  const carouselimages: string[] = [
    "../../src/images/image1.jpg",
    "../../src/images/image2.jpg",
    "../../src/images/image3.jpg",
    "../../src/images/image4.jpg",
    "../../src/images/image5.jpg",
   ];

  return (
    <main className={classes.container}>
      <div><CarouselDisplay images={carouselimages} /></div>
      <FavouritedProducts />
    </main>
  );
}
