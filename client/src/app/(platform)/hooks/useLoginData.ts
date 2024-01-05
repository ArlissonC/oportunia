import { authService } from "@/services/auth";
import { ChangeUserPasswordRequest } from "@/services/auth/types";
import { loginDataSchema } from "@/validation/yup/profile";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export type LoginDataFormValues = {
  currentPassword: string;
  newPassword: string;
};

export const useLoginData = () => {
  const changeUserPasswordMutation = useMutation<
    string,
    Error,
    ChangeUserPasswordRequest
  >(authService.changeUserPassword);

  const formik = useFormik<LoginDataFormValues>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: loginDataSchema,
    onSubmit: async ({ currentPassword, newPassword }) => {
      await handleChangeUserPassword({ currentPassword, newPassword });
    },
  });

  const { data: loginData } = useQuery("loginData", authService.me, {
    refetchOnWindowFocus: false,
  });

  const handleChangeUserPassword = async (
    params: ChangeUserPasswordRequest,
  ) => {
    changeUserPasswordMutation.mutate(params, {
      onSuccess: async (message) => {
        toast.success(message);
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  };

  return { formik, loginData };
};
