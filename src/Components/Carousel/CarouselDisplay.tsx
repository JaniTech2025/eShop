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
              <img src={src} alt={`Image ${index + 1}`} />
            </li>
          ))}
        </ul>

        <div className={styles.carousel__nav}>
          {images.map((_, index: number) => (
            <button
              key={`dot-${index}`}
              onClick={() => handleDotClick(index)}
              className={`${styles.dot} ${currentSlide === index ? styles.active : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
