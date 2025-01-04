import { IFormInputProps } from "../../interfaces/Global";
import Select from "../Select/Select";
import "./style.css";
const FormInput = ({
  className,
  label,
  type,
  id,
  name,
  onChange,
  onBlur,
  shortP,
  icon,
  placeholder,
  required,
  disabled,
  defaultValue,
  error,
  sublabel,
  selectOptions,
  keyPropertyName,
  itemPropertyName,
  valuePropertyName,
}: IFormInputProps) => {
  return (
    <div className={`${error ? "" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="labelClassName font-workSans">
          <span>{label}</span>
          {required ? <em className="required"> * </em> : ""}{" "}
          <span>{sublabel}</span>
        </label>
      )}

      <div className="input">
        {icon && <span>{icon}</span>}
        {type === "cSelect" ? (
          <Select
            id={id}
            options={selectOptions}
            selectedOption={defaultValue}
            setSelectedOption={(option: any) =>
              onChange &&
              onChange({
                target: {
                  name: id,
                  value: option,
                },
              })
            }
            errors={error}
            placeholder={placeholder}
            keyPropertyName={keyPropertyName}
            itemPropertyName={itemPropertyName}
            valuePropertyName={valuePropertyName}
          />
        ) : type === "checkbox" ? (
          <div className="flex items-center w-full gap-2">
            <input
              id={id}
              name={name}
              type={type}
              onChange={onChange}
              onBlur={onBlur}
              className={error ? "errors  !m-0" : "!m-0"}
              placeholder={placeholder}
              disabled={disabled}
              // checked={defaultCheck}
            />
            <small className="">{label} </small>
          </div>
        ) : (
          <>
            <input
              id={id}
              name={name}
              type={type}
              onChange={onChange}
              onBlur={onBlur}
              className="form-controls"
              placeholder={placeholder}
              disabled={disabled}
              defaultValue={defaultValue}
            />
          </>
        )}
      </div>
      {error && <p className="errorMsg">{error}</p>}
      {shortP && <p className="shortP">{shortP}</p>}
    </div>
  );
};

export default FormInput;
