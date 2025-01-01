import FormInput from "../FormInput";
import ImageUpload from "../Upload/ImageUpload";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AccountTypes } from "../../utils";

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
  }) => void;
}

const AddDirector = ({
  addNewDirector,
  setAddNewDirector,
  onAddNewDirector,
}: AddDirector) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    idNo: "",
    idType: "",
    email: "",
    phone: "",
  };

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("Business Name is required"),
    lastName: Yup.string().required("Phone is required"),
    idNo: Yup.string().required("Company Type is required"),
    idType: Yup.string().required("RC Number is required"),
    email: Yup.string().required("Industry is required"),
    phone: Yup.string().required("Size is required"),
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
      };
      onAddNewDirector(newDirector);
      resetForm();
      setAddNewDirector(false);
    } catch (error) {}
  };

  const { values, touched, errors, handleBlur, resetForm, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  return (
    <>
      {addNewDirector && (
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

          <ImageUpload title="Upload Director's ID Card" />

          <div className="flex justify-end">
            <button onClick={onSubmit} className="yellow-frame-btn">
              + Add Director
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDirector;
