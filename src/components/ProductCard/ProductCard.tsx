// import React from 'react';
// import { Product } from '../../store/slices/productsSlice';
// import styles from './ProductCard.module.scss';

// interface ProductCardProps {
//   product: Product;
//   onAddToCart: (product: Product) => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
//   return (
//     <div className={styles.productCard}>
//       <img
//         src={product.imageUrl}
//         alt={product.name}
//         className={styles.productImage}
//       />
//       <h3 className={styles.productName}>{product.name}</h3>
//       <p className={styles.productPrice}>${product.price}</p>
//       <button
//         className={styles.addToCartButton}
//         onClick={() => onAddToCart(product)}
//         disabled={!product.inStock}
//       >
//         В корзину
//       </button>
//     </div>
//   );
// };

// export default ProductCard;
export {};