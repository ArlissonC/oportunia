import { authService } from "@/services/auth";
import {
  ResetUserPasswordRequest,
  ResetUserPasswordResponse,
} from "@/services/auth/types";
import { resetUserPasswordSchema } from "@/validation/yup/auth";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const useResetUserPassword = () => {
  const params = useSearchParams();
  const queryResetToken = params.get("resetToken");
  const { push } = useRouter();
  const resetUserPasswordMutation = useMutation<
    ResetUserPasswordResponse,
    Error,
    ResetUserPasswordRequest
  >(authService.resetUserPassword);
  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: resetUserPasswordSchema,
    onSubmit: ({ newPassword }) => {
      handleResetUserPassword(newPassword);
    },
  });

  const handleResetUserPassword = async (newPassword: string) => {
    const resetToken = queryResetToken as string;
    resetUserPasswordMutation.mutate(
      { newPassword, email: "arlisson.fs13@gmail.com", resetToken },
      {
        onSuccess: ({ message }) => {
          toast.success(message);
          push("/login");
        },
      },
    );
  };

  return { formik, resetUserPasswordMutation };
};

export default useResetUserPassword;
