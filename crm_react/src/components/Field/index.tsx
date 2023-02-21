import React from "react";
import { FieldValues } from "react-hook-form";
import * as Styles from "./styles";
import type { FieldProps } from "types/components/Field";

const Field = <TFieldValues extends FieldValues>({
  type,
  name,
  watch,
  errors,
  register,
  required,
  validate,
}: FieldProps<TFieldValues>) => {
  const isTextarea = type === "textarea";
  const ref = !validate
    ? { required }
    : {
        required: required,
        validate: (value: string) =>
          value === validate || "The passwords do not match",
      };
  return (
    <Styles.FieldWrapper textarea={isTextarea}>
      {isTextarea ? (
        <Styles.Textarea
          as="textarea"
          id={name}
          {...register(name, { required })}
          empty={!watch(name)}
          error={errors}
        />
      ) : (
        <Styles.Input
          type={type}
          id={name}
          {...register(name, ref)}
          empty={!watch(name)}
          error={errors}
        />
      )}
      <Styles.Label htmlFor={name} empty={!watch(name)} error={errors}>
        {name === "re_password"
          ? "Repeat password"
          : `${name[0].toUpperCase()}${name.slice(1).replace("_", " ")}`}
      </Styles.Label>
      {errors && (
        <Styles.Span textarea={isTextarea}>
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
