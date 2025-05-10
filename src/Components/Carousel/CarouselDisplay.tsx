import {  useState, type JSX } from "react";
import styles from "./Carousel.module.scss";

type CarouselDisplayProps = {
  images: string[];
};

export function CarouselDisplay({ images }: CarouselDisplayProps): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0); 

  const handleDotClick = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <ul
          className={styles.carousel__items}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((src: string, index: number) => (
            <li key={index} className={styles.carousel__item}>
              <img src={src} alt={`Image ${index + 1}`}     className={styles.carousel__image}/>
            </li>
          ))}
        </ul>

        <div className={styles.carousel__nav}>
          {images.map((_, index: number) => (
            <div className="carouseldots" key={`dot-container-${index}`}>
              <button
                key={`dot-${index}`}
                onClick={() => handleDotClick(index)}
                className={`${styles.dot} ${currentSlide === index ? styles.active : ""}`}
              />
            </div>
          ))}
          <div className={styles.containertext}>
            Lights On.
            <p>Our commitment to sustainability, affordability, and exceptional customer service 
              ensures that you'll find the ideal lighting that not only fits your style but also
               your values. Explore our collections today and transform your space with the perfect lighting!</p>
            <p>Find Your Perfect Light.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
