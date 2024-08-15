import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setProducts } from '../store/slices/productsSlice';
import styles from '../styles/ProductList.module.css';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  useEffect(() => {
    // Заглушка для загрузки продуктов с бэкенда
    const fetchProducts = async () => {
      // Здесь выполняем запрос на API
      const response = [
        { id: 1, name: 'Товар 1', price: 100, imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Товар 2', price: 200, imageUrl: 'https://via.placeholder.com/150' },
      ];
      dispatch(setProducts(response));
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <div key={product.id} className={styles.productCard}>
          <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productPrice}>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;