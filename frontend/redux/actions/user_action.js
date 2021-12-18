export function loginUser(data) {
  return {
    type: "LOG_IN_USER",
    data,
  };
}

export function logoutUser(data) {
  return {
    type: "LOG_OUT_USER",
  };
}
