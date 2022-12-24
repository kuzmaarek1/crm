import React, { useRef } from "react";
import * as Styles from "./styles";

const Field = ({
  type,
  name,
  watch,
  errors,
  register,
  required,
  textarea,
  validate,
}) => {
  const password = useRef({});
  password.current = watch("password", "");
  const ref = !validate
    ? { required }
    : {
        required: required,
        validate: (value) =>
          value === password.current || "The passwords do not match",
      };
  return (
    <Styles.FieldWrapper textarea={textarea}>
      {textarea ? (
        <Styles.Textarea
          as="textarea"
          type={type}
          name={name}
          id={name}
          {...register(name, { required })}
          empty={watch(name)}
          error={errors[name]}
        />
      ) : (
        <Styles.Input
          type={type}
          name={name}
          id={name}
          {...register(name, ref)}
          empty={watch(name)}
          error={errors[name]}
        />
      )}
      <Styles.Label
        htmlFor={name}
        empty={watch(name) === undefined || watch(name) === ""}
        error={errors[name]}
      >
        {name === "re_password"
          ? "Repeat password"
          : `${name[0].toUpperCase()}${name.slice(1).replace("_", " ")}`}
      </Styles.Label>
      {errors[name] && (
        <Styles.Span textarea={textarea}>
          {name === "re_password"
            ? "The passwords must be identical"
            : `${name[0].toUpperCase()}${name
                .slice(1)
                .replace("_", " ")} is required`}
        </Styles.Span>
      )}
    </Styles.FieldWrapper>
  );
};

export default Field;
