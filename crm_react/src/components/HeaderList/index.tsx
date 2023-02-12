import React from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetFocus,
  Path,
} from "react-hook-form";
import { Button } from "components";
import * as Styles from "./styles";

type HeaderListProps<H, TFieldValues extends FieldValues> = {
  header: H extends "C" ? "Client" : H extends "L" ? "Lead" : "Team";
  setFocus: UseFormSetFocus<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  setModalIsOpenFormAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const HeaderList = <H, TFieldValues extends FieldValues>({
  header,
  setFocus,
  register,
  setModalIsOpenFormAdd,
  setPage,
}: HeaderListProps<H, TFieldValues>) => {
  return (
    <Styles.HeaderListWrapper>
      <Styles.Header>{header}s</Styles.Header>
      <Styles.InputWrapper>
        <Styles.Input
          type="serach"
          placeholder="Search"
          {...register(`${header.toLowerCase()}-search` as Path<TFieldValues>, {
            required: true,
            onChange: () => setPage(0),
          })}
          id={`${header.toLowerCase()}-search`}
        />
        <Styles.Label htmlFor={`${header.toLowerCase()}-search`}>
          {header === "Team" ? "Name" : "First name and last name"}
        </Styles.Label>
        <Styles.SearchIcon
          size={"20px"}
          onClick={() => {
            setFocus(`${header.toLowerCase()}-search` as Path<TFieldValues>);
          }}
        />
      </Styles.InputWrapper>
      <Styles.ButtonWrapper>
        <Button
          width="60%"
          height="7vh"
          onClick={() => setModalIsOpenFormAdd(true)}
          aria-label="add-button"
        >
          Add {header}
        </Button>
      </Styles.ButtonWrapper>
    </Styles.HeaderListWrapper>
  );
};

export default HeaderList;
