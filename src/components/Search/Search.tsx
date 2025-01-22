import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/slice/globalSlice";

function Search({
  placeholder,
  className,
  setQueryData,
}: {
  placeholder: string;
  className?: string;
  setQueryData?: Dispatch<SetStateAction<{[key: string] : string | number} >>
}) {
  const dispatch = useDispatch();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQueryData((prev) => ({
      ...prev, keyword: query
    }))
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
