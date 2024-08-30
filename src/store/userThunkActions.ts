import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { UserType, UserDataType, NotType } from "../types";
import { apiUrl } from "../App";

export const fetchAuth = createAsyncThunk(
  "user/post",
  async ({ data }: { data: UserType }) => {
    const response = await axios.post<UserType>(
      `${apiUrl}/consumers/`,
      data
    );
    if (response.status === 200 || 201) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
);

export const fetchLogout = createAsyncThunk("user/logout", async () => {
  const response = await axios.get(
    // `${import.meta.env.VITE_API}/v1/auth/logout`,
    `пам-пам`,
    {
      withCredentials: true,
    }
  );
  if (response.status === 200)
    return {
      id: 0,
      firstName: "",
      email: "",
    };
});

export const fetchUpd = createAsyncThunk("user/upd", async (data: UserType) => {
  console.log("Мама, я в fetchUpd");
  const response = await axios.put<UserType>(
    // `${import.meta.env.VITE_API}/v1/user/userUpd`,
    `пам-пам`,
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
});
