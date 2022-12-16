import React from "react";
import * as Styles from "./styles";

const Field = ({
  type,
  name,
  watchName,
  watch,
  errors,
  register,
  required,
  textarea,
}) => {
  return (
    <Styles.FieldWrapper textarea={textarea}>
      {textarea ? (
        <Styles.Textarea
          as="textarea"
          type={type}
          name={name}
          id={name}
          {...register(watchName, { required })}
          empty={watch(watchName)}
          error={errors[watchName]}
        />
      ) : (
        <Styles.Input
          type={type}
          name={name}
          id={name}
          {...register(watchName, { required })}
          empty={watch(watchName)}
          error={errors[watchName]}
        />
      )}
      <Styles.Label
        htmlFor={name}
        empty={watch(watchName) === undefined || watch(watchName) === ""}
        error={errors[watchName]}
      >
        {watchName[0].toUpperCase()}
        {watchName.slice(1).replace("_", " ")}
      </Styles.Label>
      {errors[watchName] && (
        <Styles.Span textarea={textarea}>
          {watchName[0].toUpperCase()}
          {watchName.slice(1).replace("_", " ")} is required
        </Styles.Span>
      )}
    </Styles.FieldWrapper>
  );
};

export default Field;
