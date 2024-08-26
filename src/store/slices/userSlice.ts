import { createSlice } from "@reduxjs/toolkit";
import type { UserDataType, UserType } from "../../types";
import { fetchAuth, fetchLogout, fetchUpd } from "../userThunkActions";

export type UserStateType = {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  coins: number;
};

export const initialUser: UserDataType = {
  id: "",
  name: "",
  email: "",
  phoneNumber: "",
  coins: 0,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialUser,
  reducers: {
    setUser(state, { payload }: { payload: UserType }) {
      console.log("PAYLOAD", payload);
      return { ...state, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAuth.fulfilled,
      (state, { payload }: { payload: UserType }) => {
        return { ...state, ...payload };
      }
    );

    builder.addCase(fetchLogout.fulfilled, (state) => {
      return initialUser;
    });

    builder.addCase(
      fetchUpd.fulfilled,
      (state, { payload }: { payload: UserType }) => {
        return { ...state, ...payload };
      }
    );
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
