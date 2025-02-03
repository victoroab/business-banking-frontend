export const useAuthHook = (navigate: any) => {
  const logoutUser = () => {
    localStorage.clear();
    localStorage.removeItem("persist:alert-business");
    // handleShow("idle-screen");
    navigate("/login");
  };

  return { logoutUser };
};
