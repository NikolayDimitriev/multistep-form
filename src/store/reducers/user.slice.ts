import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";

interface IUserState {
  user: IUser;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: {
    phone: "(985) 184 31 54",
    email: "dimitrievk56@gmail.com",

    nickname: "",
    name: "",
    surname: "",
    sex: "",

    advantages: ["", "", ""],
    checkbox: [],
    radio: "",

    about: "",
  },
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update(state: IUserState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    startSending(state) {
      state.isLoading = true;
    },
    sendDataSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    sendDataError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { startSending, sendDataSuccess, sendDataError, update } =
  userSlice.actions;

export default userSlice.reducer;
