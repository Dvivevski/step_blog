import { UserConstants } from "./constant";

//   This is initialStates for redux states
const initialState = {
  user: null,
  isAuth: false,
  selectedUserForChat: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.UPDATE_USER:
      return (state = {
        ...state,
        user: action.payload,
      });

    case UserConstants.UPDATE_AUTH:
      return (state = {
        ...state,
        isAuth: action.payload,
      });
    
      case UserConstants.UPDATE_SELECTED_USER_FOR_CHAT:
      return (state = {
        ...state,
        selectedUserForChat: action.payload,
      });

    default:
      return state;
  }
};
