import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  searchTerm: string;
  selectedCategories: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  searchTerm: "",
  selectedCategories: [],
  priceRange: [0, 99999],
  inStockOnly: false,
};

const applyFilters = (state: ProductsState) => {
  let filtered = state.items;

  // Фильтрация по строке поиска
  if (state.searchTerm) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(state.searchTerm)
    );
  }

  // Фильтрация по категориям
  if (state.selectedCategories.length > 0) {
    filtered = filtered.filter((product) =>
      state.selectedCategories.includes(product.category)
    );
  }

  // Фильтрация по диапазону цен
  if (state.priceRange) {
    filtered = filtered.filter(
      (product) =>
        product.price >= state.priceRange[0] &&
        product.price <= state.priceRange[1]
    );
  }

  // Фильтрация по наличию на складе
  if (state.inStockOnly) {
    filtered = filtered.filter((product) => product.inStock);
  }

  return filtered;
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload.map(product => ({
        ...product,
        category: product.category.toUpperCase(), // Приводим категорию к верхнему регистру
      }));
      state.filteredItems = applyFilters(state); // Применяем фильтры сразу после установки продуктов
    },
    filterProducts(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload.toLowerCase();
      state.filteredItems = applyFilters(state);
    },
    filterByCategory(state, action: PayloadAction<string[]>) {
      state.selectedCategories = action.payload;
      state.filteredItems = applyFilters(state);
    },
    filterByPrice(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
      state.filteredItems = applyFilters(state);
    },
    filterByAvailability(state, action: PayloadAction<boolean>) {
      state.inStockOnly = action.payload;
      state.filteredItems = applyFilters(state);
    },
    resetFilters(state) {
      state.selectedCategories = [];
      state.priceRange = [0, 99999];
      state.inStockOnly = false;
      state.searchTerm = "";
      state.filteredItems = state.items;
    },
  },
});

export const {
  setProducts,
  filterProducts,
  filterByCategory,
  filterByPrice,
  filterByAvailability,
  resetFilters, 
} = productsSlice.actions;

export default productsSlice.reducer;