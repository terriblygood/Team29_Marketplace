import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setProducts } from '../store/slices/productsSlice';
import { addItemToCart } from '../store/slices/cartSlice';
import styles from '../styles/ProductList.module.css';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

    useEffect(() => {
    // Заглушка для загрузки продуктов с бэкенда
    const fetchProducts = async () => {
      const response = [
        { id: 1, name: 'Товар 1', price: 100, imageUrl: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/-21/075/684/596/201/113/100033352602b0.jpg' },
        { id: 2, name: 'Товар 2', price: 200, imageUrl: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/-21/075/684/596/201/113/100033352602b0.jpg' },
      ];
      dispatch(setProducts(response));
    };

    fetchProducts();
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addItemToCart({ id: product.id, name: product.name, price: product.price }));
  };

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <div key={product.id} className={styles.productCard}>
          <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productPrice}>${product.price}</p>
          <button className={styles.addToCartButton} onClick={() => handleAddToCart(product)}>
            В корзину
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;