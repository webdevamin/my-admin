const getUserByUid = () => {
  return localStorage.getItem("uid");
};

const destroyUser = () => {
  localStorage.removeItem("uid");
};

export { getUserByUid, destroyUser };
