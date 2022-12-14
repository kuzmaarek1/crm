import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, ModalForm } from "components";
import * as Styles from "./styles";

const ModalDetails = ({
  header,
  modalIsOpen,
  closeModal,
  list,
  hook,
  teams,
}) => {
  const auth = useSelector((state) => state.auth.authData);
  const { id, created_by, ...otherData } = list;
  const [modalIsOpenFormEdit, setModalIsOpenFormEdit] = useState(false);
  return (
    <Styles.ModalWrapper
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <Styles.ButtonWrapper>
        {header === "Lead" && (
          <Button
            onClick={() => {
              hook.handleConvertToClient(list, teams.currentTeam.id);
              closeModal();
            }}
          >
            Client
          </Button>
        )}
        {((header === "Team" &&
          String(created_by?.id) === String(auth?.user.id)) ||
          header !== "Team") && (
          <>
            {header === "Team" && (
              <Button to={`/add-member/${list.id}`} as={NavLink} lead="true">
                Add member
              </Button>
            )}
            <Button onClick={() => setModalIsOpenFormEdit(true)} lead="true">
              Edit
            </Button>
            <Button
              red
              onClick={() => {
                hook.handleDelete(list, teams.currentTeam.id);
                closeModal();
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Styles.ButtonWrapper>
      <Styles.DetailsWrapper>
        {Object.entries(otherData).map(([key, value], index) => (
          <React.Fragment key={`${header}-${key}-${id}`}>
            {key !== "member" && (
              <>
                <Styles.Details
                  title="true"
                  description={key === "description"}
                  member={key === "members"}
                >
                  {key[0].toUpperCase()}
                  {key.slice(1).replace("_", " ")}
                </Styles.Details>
                {value !== null ? (
                  key !== "members" ? (
                    <Styles.Details description={key === "description"}>
                      {key === "assigned_to" ? value.username : value}
                    </Styles.Details>
                  ) : (
                    value.map(({ username }) => (
                      <Styles.Details key={`member-${username}`} member="true">
                        {username}
                      </Styles.Details>
                    ))
                  )
                ) : (
                  <Styles.Details>Not</Styles.Details>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </Styles.DetailsWrapper>
      <ModalForm
        header={header}
        modalIsOpen={modalIsOpenFormEdit}
        closeModal={() => {
          setModalIsOpenFormEdit(false);
        }}
        closeDetails={closeModal}
        hook={hook}
        teams={teams}
        list={list}
      />
    </Styles.ModalWrapper>
  );
};

export default ModalDetails;
