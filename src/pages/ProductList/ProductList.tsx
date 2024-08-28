import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setProducts } from '../../store/slices/productsSlice';
import { addItemToCart } from '../../store/slices/cartSlice';
import FilterSidebar from '../FilterSidebar/FilterSidebar';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductList.module.scss';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.filteredItems);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://29-t1api.gortem.ru/products/catalog");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
          inStock: item.count > 0,
          imageUrl: "", 
        }));
        dispatch(setProducts(formattedData));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
      })
    );
  };

  return (
    <div className={styles.productPage}>
      <FilterSidebar />
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;