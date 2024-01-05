"use client";

import classNames from "classnames";
import { CSSProperties } from "react";
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
  ValueContainerProps,
  Props as SelectProps,
} from "react-select";

interface ICustomSelectProps extends SelectProps {
  label?: string;
  errors?: any;
  mandatory?: boolean;
  row?: boolean;
  fullWidth?: boolean;
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}></components.DropdownIndicator>
  );
};

const ValueContainer = ({ children, ...props }: ValueContainerProps) => {
  let [values, input] = children as any;

  if (Array.isArray(values)) {
    const plural = values.length === 1 ? "" : "s";
    values = `${values.length} item${plural} selecionado${plural}`;
  }

  return (
    <components.ValueContainer {...props}>
      {values}
      {input}
    </components.ValueContainer>
  );
};

const CustomSelect = ({
  errors,
  label,
  mandatory,
  row,
  fullWidth,
  ...props
}: ICustomSelectProps) => {
  const customMenuStyles: CSSProperties = {
    padding: "1.5rem 2rem 1.5rem 2rem",
    borderRadius: "8px",
    background: "#F6F6FA",
    color: "#242424",
    zIndex: "500",
  };

  const customOptionsStyles: CSSProperties = {
    borderRadius: "0.625rem",
    cursor: "pointer",
  };

  const customControlStyles: CSSProperties = {
    padding: "0.4rem 1.5rem 0.4rem 0.675rem",
    borderRadius: "8px",
    border: errors ? "1px solid red" : "1px solid #CDCDCD",
    boxShadow: "none",
    cursor: "pointer",
  };

  const selectStyle: StylesConfig = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (provided: any, state: any) => {
      return {
        ...provided,
        marginBottom: "1.375rem",
        ":last-child": {
          marginBottom: "0",
        },
        background: state.isSelected ? "#334155" : "transparent",
        "&:hover": {
          color: "#ffff",
          background: "#334155",
        },
        ...customOptionsStyles,
      };
    },

    menu: (provided: any) => {
      return {
        ...provided,
        ...customMenuStyles,
      };
    },

    control: (provided: any) => {
      return {
        ...provided,
        "@media only screen and (max-width: 768px)": {
          ...provided["@media only screen and (max-width: 768px)"],
          padding: "0.4rem 0.938rem 0.4rem 0.938rem",
        },
        ...customControlStyles,
      };
    },
  };
  return (
    <label
      className={classNames({
        flex: true,
        "flex-row items-center gap-4": row,
        "flex-col": !row,
        "gap-2": label,
        "w-full": fullWidth,
      })}
    >
      {label && (
        <span className="text-white font-medium">
          {mandatory && <span className="text-red-600">*</span>}
          {label}
        </span>
      )}
      <div className="grow">
        <Select
          instanceId="instance-id-select"
          components={{
            DropdownIndicator,
            IndicatorSeparator: () => null,
            ValueContainer,
          }}
          styles={selectStyle}
          noOptionsMessage={() => "Sem opções disponíveis"}
          placeholder={"Selecione aqui"}
          isClearable={false}
          hideSelectedOptions={false}
          {...props}
        />
      </div>
      <p className="ml-2 text-sm font-medium text-error-default text-red-500">
        {errors}
      </p>
    </label>
  );
};

export default CustomSelect;
