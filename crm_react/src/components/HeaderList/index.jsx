import React from "react";
import { Button } from "components";
import * as Styles from "./styles";

const HeaderList = ({
  header,
  setFocus,
  register,
  setModalIsOpenFormAdd,
  setPage,
}) => {
  return (
    <Styles.HeaderListWrapper>
      <Styles.Header>{header}s</Styles.Header>
      <Styles.InputWrapper>
        <Styles.Input
          type="serach"
          placeholder="Search"
          {...register(`${header.toLowerCase()}-search`, {
            required: true,
            onChange: (e) => setPage(0),
          })}
          name={`${header.toLowerCase()}-search`}
          id={`${header.toLowerCase()}-search`}
        />
        <Styles.Label htmlFor={`${header.toLowerCase()}-search`}>
          {header === "Team" ? "Name" : "First name and last name"}
        </Styles.Label>
        <Styles.SearchIcon
          size={"20px"}
          onClick={() => {
            setFocus(`${header.toLowerCase()}-search`);
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
