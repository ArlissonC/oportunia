export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  name: string;
};

export type SignUpResponse = {
  message: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type ResetUserPasswordResponse = {
  message: string;
};

export type ResetUserPasswordRequest = {
  resetToken: string;
  newPassword: string;
  email: string;
};

export type ChangeUserPasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type Me = {
  email: string;
  roles: string[];
};

export type RegisterRequest = {
  email: string;
  password: string;
  name?: string;
  birthDate?: string;
  phoneNumber: string;
  role: number;
};

export type RegisterResponse = {
  message: string;
  id: string;
};
