import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "../../../components/FormInput";
import { errorHandler, securityQuestions } from "../../../utils";
import { useSubmitSecurityQuestionsMutation } from "../../../service/account";
import { DeleteIcon } from "../../../assets/svg/Accout";
import Spinner from "../../../components/Spinner/Spinner";

const SecurityQuestion = () => {
  const [submitSecurityQuestions, { isLoading }] =
    useSubmitSecurityQuestionsMutation();
  const initialValues = {
    securityQuestions: [
      {
        question: "",
        answer: "",
      },
    ],
  };

  const onSubmit = async (formData: any) => {
    try {
      const securityQuestions = formData.securityQuestions.map((q: any) => ({
        number: Math.floor(Math.random() * 100),
        question: q.question,
        answer: q.answer,
      }));

      const response = await submitSecurityQuestions({
        securityQuestions,
      }).unwrap();
      toast.success(response?.message);
      resetForm();
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const securityQuestionSchema = Yup.object().shape({
    securityQuestions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        answer: Yup.string().required("Answer is required"),
      })
    ),
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: securityQuestionSchema,
    onSubmit,
  });

  const addQuestion = () => {
    setFieldValue("securityQuestions", [
      ...values.securityQuestions,
      { question: "", answer: "" },
    ]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = values.securityQuestions.filter((_, i) => i !== index);
    setFieldValue("securityQuestions", newQuestions);
  };
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

      {values.securityQuestions.map((question, index) => (
        <div className="flex flex-col gap-4 w-full">
          <FormInput
            placeholder="Security Question"
            id={`securityQuestions[${index}].question`}
            name={`securityQuestions[${index}].question`}
            // error={
            //   touched.securityQuestions?.[index]?.question
            //     ? (errors.securityQuestions?.[index]?.question as string)
            //     : undefined
            // }
            type="cSelect"
            selectOptions={securityQuestions}
            keyPropertyName="question"
            valuePropertyName="question"
            itemPropertyName="question"
            defaultValue={question?.question}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormInput
            id={`answer`}
            placeholder="Answer"
            name={`securityQuestions[${index}].answer`}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={question?.answer}
          />

          {index > 0 && (
            <div className="flex gap-8 items-center justify-end h-full">
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="border rounded-full p-2 cursor-pointer border-nagative text-nagative"
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-center w-full gap-6">
        <button
          type="button"
          onClick={addQuestion}
          className="yellow-frame-btn w-full"
        >
          Add Another Question
        </button>
      </div>

      <div className="flex justify-center w-full gap-6">
        <button className="main-btn w-full" type="submit">
          {isLoading ? <Spinner /> : "Set Security Questions"}
        </button>
      </div>
    </form>
  );
};

export default SecurityQuestion;
