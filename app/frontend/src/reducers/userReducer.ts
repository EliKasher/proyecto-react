import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IUser } from "../types/users";

const initialState: IUser | null = {
  logged: false,
  id: "",
  roles: "",
  first_name: "",
  last_name: "",
  rut: "",
  email: "",
  phone: "",
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(_state, action: PayloadAction<IUser>) {
      const content = action.payload;
      return content;
    },
    resetUser(_state) {
      return initialState;
    },
  },
});

export const { setUser, resetUser } = slice.actions;
export default slice.reducer;
