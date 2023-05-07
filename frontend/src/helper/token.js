export const saveValueInLocalStorage = (label, value) =>
  window.localStorage.setItem(label, value);

export const getValueFromLocalStorage = (label) =>
  window.localStorage.getItem(label);

export const removeValueFromLocalStorage = (label) =>
  window.localStorage.removeItem(label);
