import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../Input/Input";
import { ShortThingType, ThingType } from "../../types";
import axios from "axios";
import Button from "../Button/Button";
import { notifySuccess, notifyWarning } from "../../toasters";

export default function AddThingForm({
  setActive,
  initialThing,
  id,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  initialThing: ShortThingType;
  id: string;
}) {
  const [input, setInput] = useState<ShortThingType | ThingType>(initialThing);

  useEffect(() => {
    const getThing = async (): Promise<void> => {
      try {
        axios
          .get(`https://29-t1api.gortem.ru/products/${id}`)
          .then((res) => {
            delete res.data.id;
            setInput(res.data);
          })
          .catch((err) =>
            console.log("Ошибка получения информации о вещи", err)
          );
      } catch (error) {
        console.log(error);
      }
    };
    getThing();
  }, []);

  useEffect(() => {
    console.log(input);
  }, [input]);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;

    setInput((prev) => ({
      ...prev,
      [name]: name === "count" || name === "price" ? Number(value) : value,
    }));
  };

  const updateThing = async (): Promise<void> => {
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
        const upd = await axios.post(
          `https://29-t1api.gortem.ru/products/${id}`,
          input
        );
        console.log("Мама, запрос улетел");

        notifySuccess("Вещь успешно обновлена.");
        setActive((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    } else {
      notifyWarning("Пожалуйста, заполните все поля.");
    }
  };

  return (
    <div>
      <label htmlFor="name">Название товара</label>
      <Input
        type="text"
        name="name"
        onChange={changeHandler}
        value={input.name}
        placeholder="Укажите название"
      ></Input>
      <label htmlFor="description">Описание товара</label>
      <Input
        type="text"
        name="description"
        onChange={changeHandler}
        value={input.description}
        placeholder="Введите описание"
      ></Input>
      <label htmlFor="color">Цвет товара</label>
      <Input
        type="text"
        name="color"
        onChange={changeHandler}
        value={input.color}
        placeholder="Укажите цвет"
      ></Input>
      <label htmlFor="size">Размер товара</label>
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
      <label htmlFor="count">Количество товара</label>
      <Input
        type="number"
        name="count"
        onChange={changeHandler}
        value={input.count.toString()}
        // placeholder="Количество товара"
      ></Input>
      <label htmlFor="price">Цена товара</label>
      <Input
        type="number"
        name="price"
        onChange={changeHandler}
        value={input.price.toString()}
        // placeholder="Цена товара"
      ></Input>
      <label htmlFor="category">Категория товара</label>
      <Input
        type="string"
        name="category"
        onChange={changeHandler}
        value={input.category}
        placeholder="Укажите категорию"
      ></Input>
      <label htmlFor="brand">Бренд</label>
      <Input
        type="string"
        name="brand"
        onChange={changeHandler}
        value={input.brand}
        placeholder="Укажите бренд"
      ></Input>
      <Button
        color="blue"
        onClick={() => {
          updateThing();
        }}
      >
        Обновить вещь
      </Button>
    </div>
  );
}
