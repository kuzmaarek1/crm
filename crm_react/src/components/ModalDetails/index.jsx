import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "components";
import * as Styles from "./styles";

const ModalDetails = ({
  header,
  modalIsOpen,
  closeModal,
  list,
  hook,
  teams,
}) => {
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
        <Button
          to={`/edit-${header.toLowerCase()}/${list.id}`}
          as={NavLink}
          lead="true"
        >
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
      </Styles.ButtonWrapper>
      <Styles.DetailsWrapper>
        {Object.entries(list).map(([key, value], index) => (
          <React.Fragment key={`${header}-${key}`}>
            {key !== "id" && key !== "created_by" && (
              <>
                <Styles.Details
                  title="true"
                  description={key === "description"}
                >
                  {key[0].toUpperCase()}
                  {key.slice(1).replace("_", " ")}
                </Styles.Details>
                {value !== null ? (
                  <Styles.Details description={key === "description"}>
                    {key === "assigned_to" ? value.username : value}
                  </Styles.Details>
                ) : (
                  <Styles.Details>Not</Styles.Details>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </Styles.DetailsWrapper>
    </Styles.ModalWrapper>
  );
};

export default ModalDetails;
