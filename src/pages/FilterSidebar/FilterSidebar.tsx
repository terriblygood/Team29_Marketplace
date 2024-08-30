import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  filterByCategory,
  filterByPrice,
  filterByAvailability,
  resetFilters,
} from "../../store/slices/productsSlice";
import styles from "./FilterSidebar.module.scss";

interface FilterSidebarProps {
  categories: string[];
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  onResetFilters,
}) => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 99999]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const uniqueCategories = Array.from(new Set(categories));

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    dispatch(filterByCategory(updatedCategories));
  };

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const range = value as [number, number];
      setPriceRange(range);
      dispatch(filterByPrice(range));
    }
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
      <h3>Фильтрация по категориям/цене/наличию</h3>
      <div className={styles.filterSection}>
        <h4>Категории</h4>
        <ul>
          {uniqueCategories.map((category) => (
            <li key={category}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className={styles.checkbox}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.filterSection}>
        <h4>Цена</h4>
        <div className={styles.priceInputs}>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              handleSliderChange([Number(e.target.value), priceRange[1]])
            }
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              handleSliderChange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
        <Slider
          range
          min={0}
          max={99999}
          value={priceRange}
          onChange={handleSliderChange}
          className={styles.slider}
        />
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