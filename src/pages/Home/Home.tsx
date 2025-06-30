import classes from './Home.module.scss';
import {CarouselDisplay} from "../../Components/Carousel/CarouselDisplay";
import FavouritedProducts from '../../Components/FavouritedProducts/FavouritedProducts';
import ProductsGrid from '../../Components/ProductsGrid/ProductsGrid';
const base = import.meta.env.BASE_URL;


export default function Home() {

  
const carouselimages: string[] = [
  `${base}images/lifestyle1.jpg`,
  `${base}images/lifestyle2.jpg`,
  `${base}images/lifestyle3.jpg`,
  `${base}images/lifestyle4.jpg`,
  `${base}images/lifestyle5.jpg`,
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