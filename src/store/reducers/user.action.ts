import { IUser } from "../../models/IUser";
import { AppDispatch } from "../store";
import { startSending, sendDataSuccess, sendDataError } from "./user.slice";

export const sendData = (data: IUser) => async (dispatch: AppDispatch) => {
  dispatch(startSending());
  const response = await fetch(
    "https://api.sbercloud.ru/content/v1/bootcamp/frontend",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    dispatch(sendDataError("Что-то пошло не так"));
    return;
  }

  dispatch(sendDataSuccess());
};
