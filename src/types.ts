export type UserDataType = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  coins: number;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  coins: number;
};

export type ColorTypes =
  | "neutral"
  | "danger"
  | "good"
  | "warning"
  | "gray"
  | "info"
  | "user"
  | "none"
  | "blue"
  | "green"
  | undefined;

export type ThingType = {
  id: string;
  name: string;
  description: string;
  color: string;
  size: string;
  count: number;
  price: number;
  category: string;
  brand: string;
};

export type ShortThingType = {
  name: string;
  description: string;
  color: string;
  size: string;
  count: number;
  price: number;
  category: string;
  brand: string;
};

export type NotType = {
  initiator: number;
  reciever: number;
};
