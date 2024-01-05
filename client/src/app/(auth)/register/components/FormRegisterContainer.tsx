import React, { ReactNode } from "react";

interface FormRegisterContainerProps {
  label: string;
  children: ReactNode;
}

const FormRegisterContainer = ({
  label,
  children,
}: FormRegisterContainerProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{label}</h2>
      {children}
    </div>
  );
};

export default FormRegisterContainer;
