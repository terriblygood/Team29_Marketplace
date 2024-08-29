import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByCategory, filterByPrice, filterByAvailability, resetFilters } from "../../store/slices/productsSlice";
import styles from "./FilterSidebar.module.scss";

interface FilterSidebarProps {
  categories: string[];
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories, onResetFilters }) => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 99999]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Удаление дубликатов из массива категорий
  const uniqueCategories = Array.from(new Set(categories));

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    dispatch(filterByCategory(updatedCategories));
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    const value = parseInt(event.target.value, 10);
    const newRange: [number, number] = type === "min" 
      ? [value, priceRange[1]] 
      : [priceRange[0], value];
    
    setPriceRange(newRange);
    dispatch(filterByPrice(newRange));
  };

  const handleAvailabilityChange = () => {
    setInStockOnly(!inStockOnly);
    dispatch(filterByAvailability(!inStockOnly));
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 99999]);
    setInStockOnly(false);
    dispatch(resetFilters());
    onResetFilters();
  };

  return (
    <aside className={styles.filterSidebar}>
      <h3>Фильтры</h3>
      <div className={styles.filterSection}>
        <h4>Категории</h4>
        <ul>
          {uniqueCategories.map(category => (
            <li key={category}>
              <label>
                <input 
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.filterSection}>
        <h4>Цена</h4>
        <div>
          <label>Минимум:</label>
          <input 
            type="number" 
            value={priceRange[0]} 
            onChange={(e) => handlePriceChange(e, "min")} 
          />
        </div>
        <div>
          <label>Максимум:</label>
          <input 
            type="number" 
            value={priceRange[1]} 
            onChange={(e) => handlePriceChange(e, "max")} 
          />
        </div>
      </div>
      <div className={styles.filterSection}>
        <h4>Наличие</h4>
        <label>
          <input 
            type="checkbox" 
            checked={inStockOnly} 
            onChange={handleAvailabilityChange} 
          />
          В наличии
        </label>
      </div>
      <button onClick={handleResetFilters} className={styles.resetButton}>
        Очистить фильтры
      </button>
    </aside>
  );
};

export default FilterSidebar;