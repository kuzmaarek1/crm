import React, { useState } from "react";
import { FieldValues, Path } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "types/hooks";
import { Button, ModalForm, Modal } from "components";
import {
  LeadDetailsButton,
  TeamDetailsButton,
  ClientDetailsButton,
} from "constans";
import * as Styles from "./styles";
import { Team, LeadAndClient, User } from "types";
import type { ModalDetailsProps } from "types/components/ModalDetails";

export const ModalDetails = <H, TFieldValues extends FieldValues>({
  header,
  modalIsOpen,
  closeModal,
  list,
  hook,
  teams,
  setPage,
  endpoint,
  resetSearch,
}: ModalDetailsProps<H, TFieldValues>) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.authData);
  const { id, created_by, ...otherData } = list;
  const [modalIsOpenFormEdit, setModalIsOpenFormEdit] = useState(false);
  const [modalIsOpenFormAddMembers, setModalIsOpenFormAddMembers] =
    useState(false);

  const handleButtonClick = async (name: string) => {
    switch (name) {
      case "handleConvert":
        "handleConvertToClient" in hook &&
          "first_name" in list &&
          teams?.currentTeam?.id &&
          (await hook.handleConvertToClient(list, teams.currentTeam.id));
        dispatch(endpoint.util.resetApiState());
        resetSearch(`${header.toLowerCase()}-search` as Path<TFieldValues>);
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
        teams?.currentTeam?.id &&
          (await hook.handleDelete(
            list as Team & LeadAndClient,
            teams.currentTeam.id
          ));
        dispatch(endpoint.util.resetApiState());
        resetSearch(`${header.toLowerCase()}-search` as Path<TFieldValues>);
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
            typeof created_by != "number" &&
            String(created_by?.id) === String(auth?.user?.id)) ||
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
                boldText={true}
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
                (valueData as User[]).map(({ username }) => (
                  <Styles.Details key={`member-${username}`} member={true}>
                    {username}
                  </Styles.Details>
                ))
              )}
            </React.Fragment>
          );
        })}
      </Styles.DetailsWrapper>
      <ModalForm<H, TFieldValues>
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
        <ModalForm<H, TFieldValues>
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

export default Modal(ModalDetails) as <H, TFieldValues extends FieldValues>(
  props: ModalDetailsProps<H, TFieldValues>
) => JSX.Element;
