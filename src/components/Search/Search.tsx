import { ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/slice/globalSlice";

function Search({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) {
  const dispatch = useDispatch();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
  };

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  return (
    <div className="search flex items-center w-full ">
      <input
        type="text"
        placeholder={placeholder}
        className={`form-controls ${className}`}
        onChange={handleSearchInputChange}
      />
    </div>
  );
}

export default Search;
