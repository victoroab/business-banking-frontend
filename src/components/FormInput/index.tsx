import { IFormInputProps } from "../../interfaces/Global";
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
          <></>
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
