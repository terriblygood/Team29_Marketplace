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
  priceRange: [0, 5000],
  inStockOnly: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    filterProducts(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload.toLowerCase();
      state.filteredItems = state.items.filter((product) =>
        product.name.toLowerCase().includes(state.searchTerm)
      );
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
      state.priceRange = [0, 5000];
      state.inStockOnly = false;
      state.searchTerm = "";
      state.filteredItems = state.items;
    },
  },
});


const applyFilters = (state: ProductsState) => {
  let filtered = state.items;

  if (state.searchTerm) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(state.searchTerm)
    );
  }

  if (state.selectedCategories.length > 0) {
    filtered = filtered.filter((product) =>
      state.selectedCategories.includes(product.category)
    );
  }

  if (state.priceRange) {
    filtered = filtered.filter(
      (product) =>
        product.price >= state.priceRange[0] &&
        product.price <= state.priceRange[1]
    );
  }

  if (state.inStockOnly) {
    filtered = filtered.filter((product) => product.inStock);
  }

  return filtered;
};

export const {
  setProducts,
  filterProducts,
  filterByCategory,
  filterByPrice,
  filterByAvailability,
  resetFilters, 
} = productsSlice.actions;

export default productsSlice.reducer;
