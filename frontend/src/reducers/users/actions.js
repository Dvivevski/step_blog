import { UserConstants } from "./constant";

export const updateUserAction = (data) => ({
  type: UserConstants.UPDATE_USER,
  payload: data,
});

export const updateIsAuthAction = (data) => ({
  type: UserConstants.UPDATE_AUTH,
  payload: data,
});

export const updateSelectedUserForChatAction = (data) => ({
  type: UserConstants.UPDATE_SELECTED_USER_FOR_CHAT,
  payload: data,
});
