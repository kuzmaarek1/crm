import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "components";
import * as Styles from "./styles";

const HeaderList = ({
  header,
  register,
  endpoint,
  teams,
  refetchList,
  setFocus,
  setModalIsOpenFormAdd,
}) => {
  const dispatch = useDispatch();
  const handleChangeInput = (e) => {
    if (e.target.value === "") {
      refetchList();
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
          {...register(`${header.toLowerCase()}-name`, {
            required: true,
            onChange: (e) => handleChangeInput(e),
          })}
        />
        <Styles.Label>
          {header === "Team" ? "Name" : "First name and last name"}
        </Styles.Label>
        <Styles.SearchIcon
          size={"20px"}
          onClick={() => {
            setFocus(`${header.toLowerCase()}-name`);
          }}
        />
      </Styles.InputWrapper>
      <Styles.ButtonWrapper>
        <Button
          width="60%"
          height="7vh"
          onClick={() => setModalIsOpenFormAdd(true)}
        >
          Add {header}
        </Button>
      </Styles.ButtonWrapper>
    </Styles.HeaderListWrapper>
  );
};

export default HeaderList;
