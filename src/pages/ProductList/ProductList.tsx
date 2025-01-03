import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setProducts } from "../../store/slices/productsSlice";
import { addItemToCart, increaseQuantity } from "../../store/slices/cartSlice";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import styles from "./ProductList.module.scss";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../App";
import axios, { AxiosResponse } from "axios";
import { url } from "inspector";

const categoryMap: { [key: string]: string } = {
  МЕРЧ: "MERCH",
  НЕМЕРЧ: "NOTMERCH",
  КАНЦЕЛЯРИЯ: "CHANCELLERY",
  СМАРТФОНЫ: "SMARTPHONES",
  НОУТБУКИ: "LAPTOPS",
  ГАДЖЕТЫ: "GADGETS",
  ТЕЛЕВИЗОРЫ: "TVS",
  АУДИОТЕХНИКА: "AUDIO",
  "ИГРОВЫЕ КОНСОЛИ": "GAME_CONSOLES",
  "КОМПЬЮТЕРНЫЕ КОМПЛЕКТУЮЩИЕ": "COMPUTER_PARTS",
  ФОТОАППАРАТЫ: "CAMERAS",
  "УМНЫЕ ЧАСЫ": "SMARTWATCHES",
};

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(
    (state: RootState) => state.products.filteredItems
  );
  const allProducts = useSelector((state: RootState) => state.products.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products/catalog`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        const formattedData = await Promise.all(
          data.map(async (item: any) => {
            // const imageResponse: AxiosResponse<Blob> = await axios.get(`
            //   ${apiUrl}/products/photo/download/Products_Products_481825-ruchka-dlya-detey-38.jpg`,
            //   { responseType: 'blob' }
            // );
            // const imageUrl = URL.createObjectURL(imageResponse.data);
            // console.log(imageUrl, '111111')

            return {
              id: item.id,
              name: item.name,
              price: item.price,
              category: item.category.toUpperCase(),
              inStock: item.count > 0,
              imageUrl: '',
            };
          })
        );
        dispatch(setProducts(formattedData));

        const categories: string[] = Array.from(
          new Set(data.map((item: any) => item.category.toUpperCase()))
        );
        setUniqueCategories(categories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleAddToCart = async (product: any) => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (!userId) {
      console.error("User ID not found or invalid");
      return;
    }

    const productType =
      categoryMap[product.category.toUpperCase()] || product.category;

    if (existingCartItem) {
      if (!existingCartItem.cartItemId) {
        console.error("Cart item ID is undefined. Cannot update cart item.");
        return;
      }

      try {
        const response = await fetch(
          `${apiUrl}/carts/${existingCartItem.cartItemId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              count: existingCartItem.quantity + 1,
            }),
          }
        );

        if (!response.ok) {
          console.error("Failed to update cart item:", await response.text());
          return;
        }

        dispatch(increaseQuantity(product.id));
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    } else {
      try {
        const payload = {
          consumerId: userId,
          productType: productType,
          productId: product.id,
          count: 1,
        };
        console.log("Sending payload:", JSON.stringify(payload));
        const response = await fetch(`${apiUrl}/carts/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error("Failed to add item to cart:", await response.text());
          return;
        }

        const result = await response.json();

        if (result.id) {
          dispatch(
            addItemToCart({
              ...product,
              quantity: 1,
              cartItemId: result.id,
            })
          );
        } else {
          console.error("Response does not contain cartItemId:", result);
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  return (
    <div className={styles.productPage}>
      <FilterSidebar
        categories={uniqueCategories}
        onResetFilters={() => {
          // Дополнительная логика для сброса фильтров
        }}
      />
      <div className={styles.productList}>
        {allProducts.length === 0 ? (
          <p className={styles.noProducts}>
            Пока тут пусто, но мы скоро все добавим!
          </p>
        ) : products.length === 0 ? (
          <p className={styles.noProducts}>
            По вашему запросу ничего не найдено.
          </p>
        ) : (
          products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                // src={product.imageUrl}
                onClick={() => navigate(`/thing/${product.id}`)}
                src="https://29-t1api.gortem.ru/products/photo/download/Products_Products_481825-ruchka-dlya-detey-38.jpg"
                alt={product.name}
                className={styles.productImage}
              />
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>{product.price} к.</p>
              {product.inStock ? (
                <button
                  className={styles.addToCartButton}
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  В корзину
                </button>
              ) : (
                <span>Товара нет в наличии</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
