import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "../../../components/FormInput";
import { securityQuestions } from "../../../utils";

const SecurityQuestion = () => {
  const initialValues = {
    question: "",
    answer: "",
  };

  const onSubmit = async (formData: any) => {
    try {
      console.log(formData);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const businessAddressSchema = Yup.object().shape({
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: businessAddressSchema,
      onSubmit,
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 justify-center items-center w-[472px]"
    >
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Security Question
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Enhance the security of your account by setting a security question.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <FormInput
          placeholder="Security Question"
          id={"question"}
          name="question"
          error={touched.question ? errors.question : undefined}
          type="cSelect"
          selectOptions={securityQuestions}
          keyPropertyName="question"
          valuePropertyName="question"
          itemPropertyName="question"
          defaultValue={values?.question}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormInput
          id={"answer"}
          placeholder="Answer"
          name="answer"
          error={touched.answer ? errors.answer : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.answer}
        />
      </div>

      <div className="flex justify-center  w-full gap-6">
        <button className="main-btn w-full" type="submit">
          Set Security Question
        </button>
      </div>
    </form>
  );
};

export default SecurityQuestion;
