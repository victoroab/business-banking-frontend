import AuthLayout from "../../layout/AuthLayout";
import FormInput from "../../components/FormInput";
import Spinner from "../../components/Spinner/Spinner";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useSetNameMutation } from "../../service/kyb";
import { useNavigate } from "react-router-dom";
import Calender from "../../components/Calendar/DatePicker";
import { useState } from "react";
import { format } from "date-fns";
import { selectAuth } from "../../store/slice/authSlice";
import { useAppSelector } from "../../hooks";

const Profile = () => {
  const [dob, setDob] = useState(new Date());
  const { phoneNumber } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const [setName, { isLoading }] = useSetNameMutation();

  const initialValues = {
    firstName: "",
    lastName: "",
    otherName: "",
  };

  const onSubmit = async (formData: any) => {
    try {
      const requiredData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        otherName: formData.otherName,
        dob: format(new Date(dob), "yyyy-MM-dd"),
        phoneNumber: phoneNumber,
      };
      const response = await setName(requiredData).unwrap();
      toast.success(response?.message);

      navigate("/passcode");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    otherName: Yup.string(),
    lastName: Yup.string().required("Last name is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  return (
    <div>
      {" "}
      <AuthLayout loginBtn={false} terms>
        <div className="text-center flex justify-center items-center flex-col mt-24 w-full">
          <form
            className="flex px-14 flex-col gap-8 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Enter Your Legal Name
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                Please provide your full legal name as it appears on your
                official documents. This helps us ensure secure and accurate
                account setup, especially for verification purposes. Make sure
                it’s spelled correctly
              </p>
            </div>

            <div className="flex flex-col gap-4">
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
                placeholder="Other Name (Optional)"
                type="text"
                id={"otherName"}
                name="otherName"
                error={touched.otherName ? errors.otherName : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.otherName}
              />
              <FormInput
                placeholder="Last Name"
                type="text"
                id={"lastName"}
                name="lastName"
                error={touched.lastName ? errors.lastName : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.lastName}
              />

              <Calender setSelectedDate={setDob} selectedDate={dob} />
            </div>
            <div className="flex justify-center  w-full gap-6">
              <button className="main-btn w-full" type="submit">
                {isLoading ? <Spinner /> : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Profile;
