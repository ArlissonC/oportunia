"use client";

import classNames from "classnames";
import InputMask from "react-input-mask";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mandatory?: boolean;
  error?: any;
  mask?: string;
  light?: boolean;
  maskChar?: null;
}

const Input = ({ label, mandatory, error, mask, ...rest }: InputProps) => {
  return (
    <label className="flex flex-col gap-2 w-full">
      <p className="font-medium text-white">
        {mandatory && <span className="text-red-600">*</span>}
        {label}
      </p>
      <InputMask
        mask={mask || ""}
        className={classNames({
          "max-w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800":
            true,
          "border border-red-600": error,
        })}
        {...rest}
      />
      <p className="ml-2 text-sm font-medium text-error-default text-red-500">
        {error}
      </p>
    </label>
  );
};

export default Input;
