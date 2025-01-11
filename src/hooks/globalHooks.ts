import { useDispatch } from "react-redux";
import { resetAllShows, toggleShow } from "../store/slice/globalSlice";

export const useGlobalHooks = () => {
  const dispatch = useDispatch();

  const handleShow = (id: string | number) => {
    dispatch(resetAllShows());
    dispatch(toggleShow(id));
  };

  const handleSearch = () => {};

  return {
    handleShow,
    handleSearch,
  };
};
