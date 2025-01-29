import { FC, useEffect, useRef, useState } from "react";
import "./style.css";
import { ArrowDownIcon } from "../../assets/svg/PayBill";
import { AlertLogoIcon } from "../../assets/svg/Sidebar";
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

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
          {options?.map((option) => (
            <li
              key={option?.[keyPropertyName as any] || option}
              className="option flex"
              onClick={() =>
                handleOptionClick(option?.[valuePropertyName as any] ?? option)
              }
            >
              <div className="items-center flex justify-between gap-2 bg-[#f7f8ff] rounded-lg p-2">
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
        </ul>
      )}
    </div>
  );
};

export default SearchSelect;
