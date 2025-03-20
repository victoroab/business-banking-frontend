import BackNavigation from "../../../../components/ArrowBack/Back";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "../../../../components/FormInput";
import {
  useGetAllRolesQuery,
  useInviteUserMutation,
} from "../../../../service/user";
import { useAppSelector } from "../../../../hooks";
import { selectAccount } from "../../../../store/slice/account";
import Spinner from "../../../../components/Spinner/Spinner";
import { errorHandler } from "../../../../utils";

const AssignNewUser = () => {
  const initialValues = {
    email: "",
    roleId: "",
  };
  const { businessKYBDetails } = useAppSelector(selectAccount);
  const { data } = useGetAllRolesQuery();
  const [inviteUser, { isLoading }] = useInviteUserMutation();
  const onSubmit = async (formData: any) => {
    try {
      const requiredData = {
        ...formData,
        businessId: businessKYBDetails.id,
      };
      const response = await inviteUser(requiredData);
      toast.success(response?.data?.message);
      console.log(requiredData, "Testing");
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const businessAddressSchema = Yup.object().shape({
    email: Yup.string().required("Email address is required"),
    roleId: Yup.string().required("Role is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: businessAddressSchema,
      onSubmit,
    });
  console.log(values);
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col w-full">
          <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
            Assign New User
          </h3>
          <div className="flex justify-start w-28 my-4">
            <BackNavigation />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex transition-all duration-300 w-[80%] flex-col gap-6"
        >
          <FormInput
            placeholder="Email Address"
            id={"email"}
            name="email"
            error={touched.email ? errors.email : undefined}
            type="text"
            defaultValue={values?.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormInput
            placeholder="Role"
            id={"roleId"}
            name="roleId"
            error={touched.roleId ? errors.roleId : undefined}
            type="cSelect"
            selectOptions={data?.data}
            keyPropertyName="name"
            valuePropertyName="id"
            itemPropertyName="name"
            defaultValue={values?.roleId}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div className="flex justify-center  w-full gap-6">
            <button className="main-btn w-full" type="submit">
              {isLoading ? <Spinner /> : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignNewUser;
