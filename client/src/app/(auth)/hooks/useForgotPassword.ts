import { authService } from "@/services/auth";
import { ForgotPasswordResponse } from "@/services/auth/types";
import { forgotPasswordSchema } from "@/validation/yup/auth";
import { useFormik } from "formik";
import { useMutation } from "react-query";

const useForgotPassword = () => {
  const forgotPasswordMutation = useMutation<
    ForgotPasswordResponse,
    Error,
    string
  >(authService.forgotPassword);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: ({ email }) => {
      handleForgotPassword(email);
    },
  });

  const handleForgotPassword = async (email: string) => {
    forgotPasswordMutation.mutate(email, {
      onSuccess: () => formik.resetForm(),
    });
  };

  return { formik, forgotPasswordMutation };
};

export default useForgotPassword;
