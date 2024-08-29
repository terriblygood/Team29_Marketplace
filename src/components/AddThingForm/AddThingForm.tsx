import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../Input/Input";
import { ShortThingType } from "../../types";
import axios from "axios";
import Button from "../Button/Button";
import { notifySuccess, notifyWarning } from "../../toasters";
import style from "./AddThingForm.module.scss";

export default function AddThingForm({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialThing = {
    name: "",
    description: "",
    color: "",
    size: "",
    count: 0,
    price: 0,
    category: "",
    brand: "",
  };

  const [input, setInput] = useState<ShortThingType>(initialThing);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;

    setInput((prev) => ({
      ...prev,
      [name]: name === "count" || name === "price" ? Number(value) : value, // Преобразуем count и price в числа
    }));
  };

  const addThing = async (): Promise<void> => {
    if (
      input.name &&
      input.description &&
      input.color &&
      input.size &&
      input.count &&
      input.price &&
      input.category &&
      input.brand
    ) {
      try {
        const add = await axios.post(
          `https://29-t1api.gortem.ru/products/`,
          input
        );
        notifySuccess("Вещь успешно добавлена.");
        setActive((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    } else {
      notifyWarning("Пожалуйста, заполните все поля.");
    }
  };

  return (
    <div className={style.form}>
      <label htmlFor="name">
        Название товара
        <Input
          type="text"
          name="name"
          onChange={changeHandler}
          value={input.name}
          placeholder="Укажите название"
        ></Input>
      </label>
      <label htmlFor="description">
        Описание товара
        <Input
          type="text"
          name="description"
          onChange={changeHandler}
          value={input.description}
          placeholder="Введите описание"
        ></Input>
      </label>
      <label htmlFor="color">
        Цвет товара
        <Input
          type="text"
          name="color"
          onChange={changeHandler}
          value={input.color}
          placeholder="Укажите цвет"
        ></Input>
      </label>
      <label htmlFor="size" className={style.specialLabel}>
        Размер товара
        <select
          // type="text"
          name="size"
          onChange={changeHandler}
          value={input.size}
        >
          <option value="">Укажите размер</option>
          <option value="ONE_SIZE">One Size</option>
          <option value="XXS">XXS</option>
          <option value="XS">XS</option>
          <option value="S">s</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="XXXL">XXXL</option>
          <option value="XXXXL">XXXXL</option>
        </select>
      </label>
      <label htmlFor="count">
        Количество товара
        <Input
          type="number"
          name="count"
          onChange={changeHandler}
          value={input.count.toString()}
          // placeholder="Количество товара"
        ></Input>
      </label>
      <label htmlFor="price">
        Цена товара
        <Input
          type="number"
          name="price"
          onChange={changeHandler}
          value={input.price.toString()}
          // placeholder="Цена товара"
        ></Input>
      </label>
      <label htmlFor="category">
        Категория товара
        <Input
          type="string"
          name="category"
          onChange={changeHandler}
          value={input.category}
          placeholder="Укажите категорию"
        ></Input>
      </label>
      <label htmlFor="brand">
        Брeнд
        <Input
          type="string"
          name="brand"
          onChange={changeHandler}
          value={input.brand}
          placeholder="Укажите бренд"
        ></Input>
      </label>
      <Button
        color="blue"
        onClick={() => {
          addThing();
        }}
      >
        Добавить вещь
      </Button>
    </div>
  );
}
