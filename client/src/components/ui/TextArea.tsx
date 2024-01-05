"use client";

import classNames from "classnames";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface TextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  mandatory?: boolean;
  error?: any;
}

const TextArea = ({ label, mandatory, error, ...rest }: TextAreaProps) => {
  return (
    <label className="flex flex-col gap-2">
      <p className="font-medium text-white">
        {mandatory && <span className="text-red-600">*</span>}
        {label}
      </p>
      <textarea
        className={classNames({
          "resize-none border border-gray-300 rounded-lg outline-none px-4 py-3 text-gray-800":
            true,
          "border border-red-600": error,
        })}
        rows={4}
        cols={40}
        {...rest}
      ></textarea>
      <p className="ml-2 text-sm font-medium text-error-default text-red-600">
        {error}
      </p>
    </label>
  );
};

export default TextArea;
