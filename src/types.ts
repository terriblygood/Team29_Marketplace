export type UserDataType = {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  coins: number;
};

export type UserType = {
  id?: string;
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
  | undefined;

export type ThingType = {
  id: number;
  userId: number;
  categoryId: number;
  thingName: string;
  description: string;
  thingAddress: string;
  thingLat: number;
  thingLon: number;
  startDate: Date;
  endDate: Date;
  isApproved: boolean;
  inDeal: boolean;
  // User: ShortUserType;
  Category: { categoryTitle: string };
  // Photos: PhotoType[];
  issue?: string;
};

export type NotType = {
  initiator: number;
  reciever: number;
};
