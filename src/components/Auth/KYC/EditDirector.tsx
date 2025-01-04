import { useState } from "react";
import PopUp from "../../PopUps/PopUp";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { editDirector, selectAuth } from "../../../store/slice/authSlice";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import FormInput from "../../FormInput";
import { AccountTypes } from "../../../utils";
import ImageUpload from "../../Upload/ImageUpload";

const EditDirector = () => {
  const { selectedDirector } = useAppSelector(selectAuth);
  const [document, setDocument] = useState<string>("");
  const dispatch = useAppDispatch();
  const { handleShow } = useGlobalHooks();
  const initialValues = {
    firstName: selectedDirector?.firstName || "",
    lastName: selectedDirector?.lastName || "",
    idNo: selectedDirector?.idNumber || "",
    idType: selectedDirector?.idType || "",
    email: selectedDirector?.email || "",
    phone: selectedDirector?.phone || "",
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
        id: selectedDirector?.id,
        firstName: values.firstName,
        lastName: values.lastName,
        idNo: values.idNo,
        idType: values.idType,
        email: values.email,
        phone: values.phone,
        idCard: document,
      };
      console.log(newDirector);
      dispatch(editDirector(newDirector));
      resetForm();
      handleShow("edit-director");
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

  return (
    <PopUp id={"edit-director"}>
      <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-pryColor font-semibold text-2xl mb-4 font-bricolage leading-6">
            Update Director Details
          </h3>
          <h3
            className="text-gryColr font-semibold text-2xl mb-4 font-bricolage leading-6 cursor-pointer"
            onClick={() => handleShow("edit-director")}
          >
            X
          </h3>
        </div>
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
            isBase64={true}
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
              Update
            </button>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default EditDirector;
