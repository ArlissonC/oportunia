import { authService } from "@/services/auth";
import { SignInRequest, SignInResponse } from "@/services/auth/types";
import { loginSchema } from "@/validation/yup/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";
import { authorization } from "@/constants/authorization";

const useLogin = () => {
  const {
    actions: { setAuthStore },
  } = useAuthStore();
  const loginMutation = useMutation<SignInResponse, Error, SignInRequest>(
    authService.signIn,
  );
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }, { setSubmitting }) => {
      handleSignIn(email, password);

      setSubmitting(false);
    },
  });

  const handleSignIn = async (email: string, password: string) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          const { token } = data;
          if (token) {
            Cookies.set("token", token, {
              expires: new Date(
                new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
              ),
            });
            const user = authorization.readJWTtoken(token);
            setAuthStore("isCandidate", user?.role === "Candidate");
            setAuthStore("isUserLogged", true);
            push("/vacancies");
          }
        },
      },
    );
  };

  return { formik, loginMutation };
};

export default useLogin;
