import { FieldValues, UseFormRegister, UseFormSetFocus } from "react-hook-form";

export type HeaderListProps<H, TFieldValues extends FieldValues> = {
  header: H extends "C" ? "Client" : H extends "L" ? "Lead" : "Team";
  setFocus: UseFormSetFocus<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  setModalIsOpenFormAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
