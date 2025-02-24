import { FC, useEffect, useRef, useState } from "react";
import "./style.css";
import { ArrowDownIcon } from "../../assets/svg/PayBill";
import { AlertLogoIcon } from "../../assets/svg/Sidebar";
import Spinner from "../Spinner/Spinner";
interface SelectProps {
  id: string;
  label?: string;
  options?: any[];
  selectedOption?: string | number;
  setSelectedOption: (option: string) => void;
  errors?: any;
  required?: boolean;
  labelClassName?: string;
  keyPropertyName?: string | number;
  itemPropertyName?: string | number;
  valuePropertyName?: string | number;
  placeholder?: string;
  filter?: boolean;
  accountName?: string;
  accountType?: string;
  isLoading?: boolean;
}

const SearchSelect: FC<SelectProps> = ({
  id,
  options,
  selectedOption,
  setSelectedOption,
  keyPropertyName,
  placeholder,
  itemPropertyName,
  valuePropertyName,
  accountName,
  accountType,
  filter,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const dynamicSelectedOption = options?.find((item) =>
    valuePropertyName ? item?.[valuePropertyName] === selectedOption : null
  );

  const filteredOptions = options?.filter((option) =>
    option?.[itemPropertyName as any]
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div
      id={id}
      className={`${filter && "shadow-md rounded-xl"} customSelect`}
      ref={popupRef}
    >
      <p
        className={`selectText ${isOpen ? "focused" : ""}`}
        onClick={toggleDropdown}
      >
        {selectedOption !== undefined &&
        selectedOption !== null &&
        selectedOption !== "" ? (
          <span className="text-Grey1">
            {dynamicSelectedOption
              ? dynamicSelectedOption[itemPropertyName as any]
              : selectedOption}
          </span>
        ) : (
          <span className="placeholder"> {placeholder}</span>
        )}
        <ArrowDownIcon />
      </p>
      {isOpen && (
        <ul className="options p-4">
          <div className="flex px-4 mb-6">
            <input
              placeholder="🔍 Search for Account"
              className={`form-controls w-full`}
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
            />
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center w-full">
              <Spinner />
            </div>
          ) : (
            <>
              {filteredOptions !== undefined && filteredOptions?.length >= 1 ? (
                <>
                  {filteredOptions?.map((option) => (
                    <li
                      key={option?.[keyPropertyName as any] || option}
                      className="flex p-[10px] px-[20px] cursor-pointer font-normal flex-col text-[15px] items-start gap-[10px]"
                      onClick={() =>
                        handleOptionClick(
                          option?.[valuePropertyName as any] ?? option
                        )
                      }
                    >
                      <div className="items-center flex justify-between gap-2 bg-[#f7f8ff] rounded-xl p-4 w-full">
                        <div className="flex gap-2">
                          <AlertLogoIcon />
                          <div className="text-greyColr font-workSans flex gap-2 flex-col leading-4 font-medium text-sm">
                            {option?.[accountName as any]}{" "}
                            <span className="text-sm font-medium text-greyColr">
                              Account Number {option?.[itemPropertyName as any]}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`rounded-full flex justify-center items-center p-2  cursor-pointer ${
                            option?.[accountType as any] === "POS"
                              ? "text-nagative bg-nagative-Light"
                              : "text-positive bg-positive-Light"
                          }`}
                        >
                          {option?.[accountType as any]}
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <div className="flex justify-center items-center font-workSans text-sm pb-4">
                  Not found
                </div>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchSelect;
