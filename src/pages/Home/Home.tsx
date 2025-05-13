import classes from './Home.module.scss';
import {CarouselDisplay} from "../../Components/Carousel/CarouselDisplay";
import FavouritedProducts from '../../Components/FavouritedProducts/FavouritedProducts';
import ProductsGrid from '../../Components/ProductsGrid/ProductsGrid';

export default function Home() {

  
  const carouselimages: string[] = [
    "../../src/images/lifestyle1.jpg",
    "../../src/images/lifestyle2.jpg",
    "../../src/images/lifestyle3.jpg",
    "../../src/images/lifestyle4.jpg",
    "../../src/images/lifestyle5.jpg",
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