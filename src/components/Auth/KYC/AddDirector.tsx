import FormInput from "../../FormInput";
import ImageUpload from "../../Upload/ImageUpload";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AccountTypes } from "../../../utils";
import { useState } from "react";
interface AddDirector {
  addNewDirector: boolean;
  setAddNewDirector: React.Dispatch<React.SetStateAction<boolean>>;
  onAddNewDirector: (newDirector: {
    id: any;
    firstName: string;
    lastName: string;
    idNo: string;
    idType: string;
    email: string;
    phone: string;
    idCard: string;
  }) => void;
}

const AddDirector = ({
  addNewDirector,
  setAddNewDirector,
  onAddNewDirector,
}: AddDirector) => {
  const [document, setDocument] = useState<string>("");

  const initialValues = {
    firstName: "",
    lastName: "",
    idNo: "",
    idType: "",
    email: "",
    phone: "",
  };

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    idNo: Yup.string().required("ID No is required"),
    idType: Yup.string().required("ID Type is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const onSubmit = () => {
    try {
      const newDirector = {
        id: Date.now(),
        firstName: values.firstName,
        lastName: values.lastName,
        idNo: values.idNo,
        idType: values.idType,
        email: values.email,
        phone: values.phone,
        idCard: document,
      };
      onAddNewDirector(newDirector);
      resetForm();
      setAddNewDirector(false);
    } catch (error) {}
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    resetForm,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit,
  });

  const handleAddNewDirector = () => {
    setDocument("");
    setAddNewDirector(true);
  };

  return (
    <>
      {addNewDirector ? (
        <div className="flex flex-col gap-4 w-[100%]">
          <FormInput
            placeholder="First Name"
            type="text"
            id={"firstName"}
            name="firstName"
            error={touched.firstName ? errors.firstName : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.firstName}
          />
          <FormInput
            placeholder="Last name"
            type="text"
            id={"lastName"}
            name="lastName"
            error={touched.lastName ? errors.lastName : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.lastName}
          />

          <FormInput
            placeholder="Identification Type"
            type="cSelect"
            id={"idType"}
            name="idType"
            error={touched.idType ? errors.idType : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.idType}
            selectOptions={AccountTypes}
            keyPropertyName="title"
            valuePropertyName="title"
            itemPropertyName="title"
          />
          <FormInput
            placeholder="Identification Number"
            type="text"
            id={"idNo"}
            name="idNo"
            error={touched.idNo ? errors.idNo : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.idNo}
          />
          <FormInput
            placeholder="Email Address"
            type="text"
            id={"email"}
            name="email"
            error={touched.email ? errors.email : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.email}
          />
          <FormInput
            placeholder="Phone"
            type="text"
            id={"phone"}
            name="phone"
            error={touched.phone ? errors.phone : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.phone}
          />

          <ImageUpload
            title="Upload Director's ID Card"
            setDocument={setDocument}
          />

          <div className="flex justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="yellow-frame-btn text-sm w-[150px]"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-end ">
            <button
              className="yellow-frame-btn text-sm w-[150px]"
              onClick={handleAddNewDirector}
            >
              + Add Director
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AddDirector;
