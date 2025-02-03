export const useAuthHook = () => {
  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return { logoutUser };
};
