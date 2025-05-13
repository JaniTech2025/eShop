import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product } from '../../services/type';
import Pagination from '../../Components/Pagination/Pagination';
import styles from "./StockAvailableProducts.module.scss";
import Modal from '../Modal/Modal';

const ITEMS_PER_PAGE = 4;

interface Props {
  products: Product[];
  onAddToCart: (product: any) => void; 
}


const StockAvailableProducts: React.FC<Props> = ({ products, onAddToCart }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastAddedProductName, setLastAddedProductName] = useState<string | null>(null);  
  const [selectedVariants, setSelectedVariants] = useState<Map<string, number>>(new Map());

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  
  const handleVariantSelect = (productId: string, variantIndex: number) => {
  setSelectedVariants(prev => new Map(prev).set(productId, variantIndex));


  };


  const openModal = (productName: string) => {
    setLastAddedProductName(productName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLastAddedProductName(null);
  };


  return (
    <section>
      <div className={styles.productgrid}>
        {currentProducts.map(product => {
          const selectedVariantIndex = selectedVariants.get(product.id) ?? 0;
          const selectedVariant = product.variants[selectedVariantIndex];
          const swatchSet: boolean = product.variants.length > 1;
          console.log("variants?", product.variants.length);


          return (
            <div className={styles.productcard} key={product.id}>
              <img
                src={selectedVariant.image}
                alt={`${product.name} - ${selectedVariant.colour}`}
              />
              <h3>{product.name}</h3>
     
              <p>Colour: {selectedVariant.colour}</p>
              <p>Price: ${selectedVariant.price}</p>

              {swatchSet &&  (<div className={styles.variants}>
                {product.variants.map((variant, index) => (
                  <div
                    key={index}
                    className={`${styles.variant} ${index === selectedVariantIndex ? styles.selected : ''}`}
                    style={{ backgroundColor: variant.colour }}
                    onClick={() => handleVariantSelect(product.id, index)}
                    title={variant.colour}
                  />
                ))}
                
              </div>
              )}


              <button
                onClick={() => {
                  onAddToCart({ ...product, selectedVariant });
                  //navigate("/cart");
                  // alert(product.name + " added to cart");
                  openModal(product.name);
                }}
              >
                Add to Cart
              </button>
                  
             {isModalOpen && (
              <Modal heading="Done" onClose={closeModal}>
                <p> {product.name} added to cart</p>
              </Modal>
              )}


            </div>
          );
        })}

      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {isModalOpen && lastAddedProductName && (
        <Modal heading="Done" onClose={closeModal}>
          <p>{lastAddedProductName} added to cart</p>
        </Modal>
      )}

    </section>
  );
};

export default StockAvailableProducts;
