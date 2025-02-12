import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, ModalForm, Modal } from "components";
import {
  LeadDetailsButton,
  TeamDetailsButton,
  ClientDetailsButton,
} from "constans";
import * as Styles from "./styles";

export const ModalDetails = ({
  header,
  modalIsOpen,
  closeModal,
  list,
  hook,
  teams,
  setPage,
  endpoint,
  resetSearch,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const { id, created_by, ...otherData } = list;
  const [modalIsOpenFormEdit, setModalIsOpenFormEdit] = useState(false);
  const [modalIsOpenFormAddMembers, setModalIsOpenFormAddMembers] =
    useState(false);

  const handleButtonClick = async (name) => {
    switch (name) {
      case "handleConvert":
        await hook.handleConvertToClient(list, teams.currentTeam.id);
        dispatch(endpoint.util.resetApiState());
        resetSearch(`${header.toLowerCase()}-search`);
        setPage(0);
        closeModal();
        break;
      case "handleEdit":
        setModalIsOpenFormEdit(true);
        break;
      case "handleAddMember":
        setModalIsOpenFormAddMembers(true);
        break;
      default:
        await hook.handleDelete(list, teams.currentTeam.id);
        dispatch(endpoint.util.resetApiState());
        resetSearch(`${header.toLowerCase()}-search`);
        setPage(0);
        closeModal();
        break;
    }
  };
  const buttonData =
    header === "Lead"
      ? LeadDetailsButton
      : header === "Team"
      ? TeamDetailsButton
      : ClientDetailsButton;

  return (
    <>
      <Styles.HeaderDetails>
        <Styles.Header>Details {header}</Styles.Header>
        <Styles.ButtonWrapper>
          {((header === "Team" &&
            String(created_by?.id) === String(auth?.user.id)) ||
            header !== "Team") &&
            buttonData.map(({ name, func, red }) => (
              <Button
                width="250px"
                height="50px"
                red={red}
                onClick={() => handleButtonClick(func)}
                key={name}
              >
                {name}
              </Button>
            ))}
        </Styles.ButtonWrapper>
      </Styles.HeaderDetails>
      <Styles.DetailsWrapper team={header === "Team"}>
        {Object.entries(otherData).map(([key, value], index) => {
          let valueData =
            value !== null
              ? key === "assigned_to"
                ? value.username
                : value
              : "None";
          return (
            <React.Fragment key={`${key}-${index}`}>
              <Styles.Details
                title="true"
                description={key === "description"}
                member={key === "members"}
              >
                {key[0].toUpperCase()}
                {key.slice(1).replace("_", " ")}
              </Styles.Details>
              {key !== "members" ? (
                <Styles.Details description={key === "description"}>
                  {valueData}
                </Styles.Details>
              ) : (
                valueData.map(({ username }) => (
                  <Styles.Details key={`member-${username}`} member="true">
                    {username}
                  </Styles.Details>
                ))
              )}
            </React.Fragment>
          );
        })}
      </Styles.DetailsWrapper>
      <ModalForm
        header={header}
        modalIsOpen={modalIsOpenFormEdit}
        closeModal={() => {
          setModalIsOpenFormEdit(false);
        }}
        closeDetails={closeModal}
        hook={hook}
        setPage={setPage}
        teams={teams}
        list={list}
        addMember={false}
        endpoint={endpoint}
        resetSearch={resetSearch}
      />
      {header === "Team" && (
        <ModalForm
          header={header}
          modalIsOpen={modalIsOpenFormAddMembers}
          closeModal={() => {
            setModalIsOpenFormAddMembers(false);
          }}
          closeDetails={closeModal}
          hook={hook}
          teams={teams}
          list={list}
          addMember={true}
          setPage={setPage}
          endpoint={endpoint}
          resetSearch={resetSearch}
        />
      )}
    </>
  );
};

export default Modal(ModalDetails);
