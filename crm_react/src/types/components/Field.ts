import {
  UseFormWatch,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

export type FieldProps<TFieldValues extends FieldValues> = {
  type: string;
  name: Path<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
  errors: boolean;
  register: UseFormRegister<TFieldValues>;
  required: boolean;
  validate?: string | false;
};

export type TypeTextarea = {
  readonly textarea?: boolean;
};

export type CheckFieldProps = {
  readonly error?: boolean;
  readonly empty: boolean;
};

export type TextareaProps = {
  as: React.ElementType;
};
