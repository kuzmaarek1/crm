import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "components";
import * as Styles from "./styles";

const HeaderList = ({
  header,
  endpoint,
  teams,
  setFocus,
  register,
  setModalIsOpenFormAdd,
}) => {
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const props = header !== "Team" ? teams.currentTeam.id : undefined;
    if (e.target.value === "") {
      dispatch(
        endpoint.util.prefetch(`get${header}s`, props, {
          force: true,
        })
      );
    } else {
      dispatch(
        endpoint.util.prefetch(
          `search${header}`,
          { team: teams.currentTeam.id, name: e.target.value },
          { force: true }
        )
      );
    }
  };
  return (
    <Styles.HeaderListWrapper>
      <Styles.Header>{header}s</Styles.Header>
      <Styles.InputWrapper>
        <Styles.Input
          type="serach"
          placeholder="Search"
          {...register(`${header.toLowerCase()}-search`, {
            required: true,
            onChange: (e) => handleChangeInput(e),
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
