import classes from './Home.module.scss';
import {CarouselDisplay} from "../../Components/Carousel/CarouselDisplay";
import FavouritedProducts from '../../Components/FavouritedProducts/FavouritedProducts';
import ProductsGrid from '../../Components/ProductsGrid/ProductsGrid';

export default function Home() {

  
  const carouselimages: string[] = [
    "../../src/images/image1.jpg",
    "../../src/images/image2.jpg",
    "../../src/images/image3.jpg",
    "../../src/images/image4.jpg",
    "../../src/images/image5.jpg",
   ];

  return (
    <div className={classes.container}>
      <main>
        <div><CarouselDisplay images={carouselimages} /></div>
        <div><ProductsGrid/></div>
        <div><FavouritedProducts /></div>
      </main>
    </div>
  );
}