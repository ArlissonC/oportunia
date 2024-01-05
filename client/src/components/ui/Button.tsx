"use client";

import classNames from "classnames";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactElement,
  ReactNode,
} from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  outline?: boolean;
  fullWidth?: boolean;
  danger?: boolean;
  icon?: ReactElement;
}

const Button = ({
  outline,
  fullWidth,
  children,
  danger,
  icon,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames({
        "py-3 px-8 rounded-lg flex gap-3 items-center md:text-lg font-semibold":
          true,
        "bg-brand-tertiary text-white": !outline,
        "bg-red-700": danger,
        "bg-transparent border border-brand-secondary text-gray-700": outline,
        "w-full justify-center": fullWidth,
        "w-fit": !fullWidth,
      })}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
