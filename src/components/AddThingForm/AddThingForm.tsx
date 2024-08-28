import React, { ChangeEvent, useState } from "react";
import Input from "../Input/Input";
import { ShortThingType, ThingType } from "../../types";

export default function AddThingForm() {
  const initialThing = {
    name: "",
    description: "",
    color: "",
    size: "",
    count: 0,
    price: 0,
    category: "",
    brand: "",
    image: "",
  };

  const [input, setInput] = useState<ShortThingType>(initialThing);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <Input
        type="text"
        name="name"
        onChange={changeHandler}
        value={input.name}
        placeholder="Название товара"
      ></Input>
      <Input
        type="text"
        name="name"
        onChange={changeHandler}
        value={input.name}
        placeholder="Название товара"
      ></Input>
      <Input
        type="text"
        name="name"
        onChange={changeHandler}
        value={input.name}
        placeholder="Название товара"
      ></Input>
      <Input
        type="text"
        name="name"
        onChange={changeHandler}
        value={input.name}
        placeholder="Название товара"
      ></Input>
      <Input
        type="text"
        name="name"
        onChange={changeHandler}
        value={input.name}
        placeholder="Название товара"
      ></Input>
    </div>
  );
}
